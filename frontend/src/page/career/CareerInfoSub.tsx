import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { CareerItem, CareerApplication } from "@/store/careerSlice";
import type { Tag } from "@/component/tag";
import { TagPill } from "@/component/tag";
import { submitApplicationAsync, updateApplicationStatusAsync, rescindApplicationAsync, updateApplicationDetailsAsync, fetchUserApplications } from "@/store/applicationSlice";
import { fetchCareers, deleteCareerAsync } from "@/store/careerSlice";
import { CareerRecommendations } from "@/component/career/CareerRecommendations";


const CareerInfoSub: React.FC<CareerItem> = ({
  career_id,
  title,
  company,
  postedBy,
  createdDate,
  mapLink,
  level,
  category,
  prerequisites = [],
  description,
  applications = [], // ✅ applications now part of CareerItem
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [linkInput, setLinkInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const activeUser = JSON.parse(localStorage.getItem("activeUser") || "{}");
  const userRole = activeUser?.role;
  
  const tags: Tag[] = [
    ...(level ? [{ label: level, type: "Difficulty" as const }] : []),
    ...(category ? [{ label: category, type: "Category" as const }] : []),
    ...prerequisites.map((p) => ({ label: p, type: "Prerequisite" as const })),
  ];

  // Helper: Find the application for the current user
  const userApplication = applications?.find((app: any) => app.user_id === activeUser?.userId);
  const isApplied = !!userApplication;

  const handleApply = async () => {
    if (!activeUser.userId) {
        setSubmitError("You must be logged in to apply.");
        return;
    }
    if (!linkInput.trim()) {
        setSubmitError("Please provide a link to your resume or portfolio.");
        return;
    }
    setIsSubmitting(true);
    setSubmitError("");
    
    try {
        await dispatch(submitApplicationAsync({
            careerId: career_id!,
            userId: activeUser.userId,
            resumeLink: linkInput
        }) as any).unwrap();
        // Success handled by UI update via prop refresh or local state if desired
        // Ideally we should refetch careers to see the update, but 'unwrap' ensures success
        dispatch(fetchCareers() as any); 
        dispatch(fetchUserApplications(activeUser.userId) as any); 
    } catch (err: any) {
        setSubmitError(err.message || "Failed to apply.");
    } finally {
        setIsSubmitting(false);
    }
  };

  const roleLower = userRole?.toLowerCase();
  const isLearner = roleLower === "student" || roleLower === "learner" || roleLower === "mentor";
  const isCompany = roleLower === "company" || roleLower === "admin";

  return (
    <div className="flex justify-center mt-20">
      <div className="bg-gray-900 rounded-lg p-6 w-full max-w-2xl shadow-2xl relative">
        <div className="absolute top-4 right-4 flex gap-2">
            {/* Edit/Delete for Owner */}
            {/* Edit/Delete Buttons */}
            {(() => {
                const isAdmin = userRole?.toLowerCase() === "admin";
                const isOwnCareer = activeUser.username === postedBy;
                const canEdit = isOwnCareer; 
                const canDelete = isOwnCareer || isAdmin;

                return (
                    <>
                        {canEdit && (
                            <button 
                                onClick={() => navigate(`/career/edit/${career_id}`)}
                                className="px-3 py-1 bg-blue-600/80 hover:bg-blue-500 text-white rounded text-sm"
                            >
                                Edit
                            </button>
                        )}
                        {canDelete && (
                            <button 
                                onClick={() => {
                                    if(window.confirm("Are you sure you want to delete this career?")) {
                                        dispatch(deleteCareerAsync(career_id) as any).then(() => navigate('/career'));
                                    }
                                }}
                                className="px-3 py-1 bg-red-600/80 hover:bg-red-500 text-white rounded text-sm"
                            >
                                Delete
                            </button>
                        )}
                    </>
                );
            })()}
            <button
              onClick={() => navigate(-1)}
              className="text-white hover:text-gray-300 ml-2 text-xl font-bold"
            >
              ✕
            </button>
        </div>

        <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
        <p className="text-sm text-gray-300 mb-1">
          {company && `Posted by: ${postedBy || company}`}
        </p>
        <p className="text-sm text-gray-400 mb-4">
          Created: <span className="font-medium">{createdDate}</span>
        </p>

        {/* Map Embed */}
        <div className="w-full h-48 bg-gray-700 rounded-md mb-4 overflow-hidden">
          {mapLink && mapLink.includes("google.com/maps/embed") ? (
            <iframe
              src={mapLink}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No map available
            </div>
          )}
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <>
            <p className="text-sm text-gray-300 mb-2 font-semibold">
              Project Submission Requirements:
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag, index) => (
                <TagPill key={index} tag={tag} />
              ))}
            </div>
          </>
        )}

        {/* Career Description */}
        {description && (
          <div className="mt-4">
            <p className="text-sm text-gray-300 mb-2 font-semibold">
              Career Details:
            </p>
            <p className="text-sm text-gray-200 whitespace-pre-line break-all break-words">
              {description}
            </p>
          </div>
        )}

        {/* Role-based section */}
        {isLearner ? (
          <>
            {isApplied && userApplication ? (

              <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg">
                 <div className="flex justify-between items-center mb-4">
                    <h3 className="text-white font-bold">Application Status</h3>
                    <span className={`px-3 py-1 text-sm font-bold rounded ${
                        userApplication.status === "Accepted" ? "bg-green-900 text-green-200" : 
                        userApplication.status === "Rejected" ? "bg-red-900 text-red-200" : "bg-yellow-900 text-yellow-200"
                    }`}>
                        {userApplication.status || "Pending"}
                    </span>
                 </div>
                 
                 {userApplication.status === "Pending" ? (
                    <div className="flex gap-3">
                        <button
                           onClick={() => {
                               const newLink = prompt("Update your Resume/Portfolio Link:", userApplication.resume_link || "");
                               if (newLink) {
                                   dispatch(updateApplicationDetailsAsync({ applicationId: userApplication.aplc_id, resumeLink: newLink, portfolioLink: "" }) as any)
                                     .then(() => {
                                         dispatch(fetchCareers() as any);
                                         dispatch(fetchUserApplications(activeUser.userId) as any);
                                     });
                               }
                           }} 
                           className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-2 rounded text-sm font-semibold transition"
                        >
                            Edit Application
                        </button>
                        <button 
                           onClick={() => {
                               if (window.confirm("Are you sure you want to withdraw your application? This action cannot be undone.")) {
                                   dispatch(rescindApplicationAsync(userApplication.aplc_id) as any)
                                      .then(() => {
                                          dispatch(fetchCareers() as any);
                                          dispatch(fetchUserApplications(activeUser.userId) as any);
                                      });
                               }
                           }}
                           className="flex-1 bg-red-600 hover:bg-red-500 text-white py-2 rounded text-sm font-semibold transition"
                        >
                            Rescind
                        </button>
                    </div>
                 ) : (
                    <p className="text-gray-400 text-sm italic">
                        Your application has been processed. You can no longer edit or rescind it.
                    </p>
                 )}
              </div>
            ) : (
            <>
            <label className="block text-sm text-gray-300 mb-1 mt-6">
              Resume Link (Google Drive, LinkedIn, etc.):
            </label>
            <input
              type="text"
              value={linkInput}
              onChange={(e) => setLinkInput(e.target.value)}
              placeholder="https://..."
              className="w-full p-2 rounded bg-gray-800 text-white mb-4"
            />
            <button 
                onClick={handleApply}
                disabled={isSubmitting}
                className={`w-full px-4 py-2 rounded-lg font-semibold transition ${ isSubmitting ? "bg-gray-600 cursor-not-allowed" : "bg-green-600 hover:bg-green-500" }`}>
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </button>
            {submitError && <p className="text-red-400 mt-2 text-sm">{submitError}</p>}
            </>
            )}
          </>
        ) : isCompany ? (
          <>
            <p className="text-sm text-gray-300 mb-2 font-semibold">
              Submitted Applications:
            </p>
            {applications.length > 0 ? (
              <div className="space-y-3">
                {applications.map((app: CareerApplication, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between bg-gray-800 rounded-lg p-3 shadow"
                  >
                    {/* Left side: username link */}
                    <Link
                      to={`/profile/${app.user_id}`}
                      className="text-white font-semibold hover:text-blue-400"
                    >
                      {app.user?.username || `User ${app.user_id}`}
                    </Link>

                    {/* Right side: buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                            if (app.resume_link) window.open(app.resume_link, '_blank');
                            else alert("No resume link provided.");
                        }}
                        className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-500 text-sm"
                      >
                        📎 Attachments
                      </button>
                      
                      {/* Always show status if not pending, but allow changing it */}
                      <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 text-sm font-bold rounded ${
                              app.status === "Accepted" ? "bg-green-900 text-green-200" : 
                              app.status === "Rejected" ? "bg-red-900 text-red-200" : "bg-yellow-900 text-yellow-200"
                          }`}>
                              {app.status}
                          </span>
                          
                          {/* Allow changing status ONLY if owner */}
                          {activeUser.username === postedBy && (
                              <>
                                  {app.status !== "Accepted" && (
                                    <button
                                      onClick={() => dispatch(updateApplicationStatusAsync({ applicationId: app.aplc_id, status: "Accepted" }) as any).then(() => dispatch(fetchCareers() as any))}
                                      className="px-2 py-1 bg-green-600/50 hover:bg-green-500 text-white rounded text-xs"
                                      title="Set to Accepted"
                                    >
                                      ✅
                                    </button>
                                  )}
                                  {app.status !== "Rejected" && (
                                    <button
                                      onClick={() => dispatch(updateApplicationStatusAsync({ applicationId: app.aplc_id, status: "Rejected" }) as any).then(() => dispatch(fetchCareers() as any))}
                                      className="px-2 py-1 bg-red-600/50 hover:bg-red-500 text-white rounded text-xs"
                                      title="Set to Rejected"
                                    >
                                      ❌
                                    </button>
                                  )}
                              </>
                          )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 italic">
                No applications submitted yet.
              </p>
            )}
          </>
        ) : null}

        {/* Recommendations Section */}
        <div className="mt-8 border-t border-gray-700 pt-6">
            <CareerRecommendations career={{
                  career_id, title, company, postedBy, createdDate, mapLink, level, category, prerequisites, description, applications
            }} />
        </div>
      </div>
    </div>
  );
};

export default CareerInfoSub;
