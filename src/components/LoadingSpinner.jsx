export default function LoadingSpinner({ size = 6 }) {
  return (
    <div className="flex items-center justify-center p-4">
      <div className={`animate-spin rounded-full border-4 border-t-transparent border-gray-300 dark:border-gray-600`} style={{ width: `${size}rem`, height: `${size}rem` }} />
    </div>
  );
}
