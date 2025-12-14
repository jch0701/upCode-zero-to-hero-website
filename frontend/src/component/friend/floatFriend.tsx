import { Users } from "lucide-react";

type Props = {
  isOpen: boolean;
  onToggle: () => void;
};

export default function FloatingFriends({ isOpen, onToggle }: Props) {
  return (
    <button
      onClick={onToggle}
      className="
        fixed bottom-6 right-6 z-50
        flex items-center gap-2
        bg-blue-600 hover:bg-blue-700
        text-white font-medium
        px-4 py-3
        rounded-2xl shadow-xl
        transition
      "
    >
      <Users size={20} />
      Friends
    </button>
  );
}
