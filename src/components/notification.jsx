import { IconCheck } from "../../public/icons/IconCheck";
import { IconX } from "../../public/icons/IconX";

const Notification = ({ status, notificationMessage }) => {
    return (
      <div
        tabIndex={-1}
        aria-live="polite"
        className={`absolute top-2.5 right-2.5 mb-6 p-3 sm:p-4 rounded-lg text-center outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 transition-colors ${
          status === "success"
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
        }`}
      >
        <div className="flex items-center justify-center gap-2">
          {status === "success" ? (
            <IconCheck className="h-5 w-5" />
          ) : (
            <IconX className="h-5 w-5" />
          )}
          <span className="max-sm:text-[12px]">{notificationMessage}</span>
        </div>
      </div>
    );
  };


  export default Notification