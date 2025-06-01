
interface FrameTextareaProps {
  content: string;
  onContentChange: (content: string) => void;
  placeholder?: string;
}

const FrameTextarea = ({ 
  content, 
  onContentChange, 
  placeholder = "Add details about your frame..." 
}: FrameTextareaProps) => {
  return (
    <div className="flex">
      <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center mr-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>
      <textarea
        className="flex-1 p-2 border border-orange-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
        placeholder={placeholder}
        rows={3}
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
      />
    </div>
  );
};

export default FrameTextarea;
