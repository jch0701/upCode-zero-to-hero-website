import { X } from "lucide-react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

export default function FriendsDrawer({
  isOpen,
  onClose,
  title,
  children,
}: Props) {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed right-6 bottom-6 mb-11 z-50 w-[360px] max-h-[70vh] bg-purple-500/90 backdrop-blur-xl rounded-3xl shadow-2xl transform transition-transform duration-300 ${isOpen ? "translate-y-0" : "translate-y-[120%]"}`
      }>
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-black/20">
          <div className="text-black text-xl font-bold">{title}</div>
          <button onClick={onClose} className="text-black hover:text-red-500">
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto max-h-[60vh]">
          {children}
        </div>
      </div>
    </>
  );
}
