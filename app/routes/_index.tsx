// ... previous imports
import EnhancedChat from '~/components/EnhancedChat';

export default function Index() {
  return (
    <div className="h-screen flex flex-col dark:bg-gray-900 dark:text-white">
      {/* ... previous header and main content ... */}
      
      <div className="fixed right-4 bottom-4">
        <EnhancedChat />
      </div>
    </div>
  );
}
