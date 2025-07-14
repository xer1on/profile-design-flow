export const BootScreen = () => {
  return (
    <div className="h-screen bg-terminal-bg flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="text-terminal-green font-mono text-2xl mb-8">Portfolio OS v2.0</div>
        <div className="flex justify-center">
          <div className="animate-spin border-2 border-terminal-green border-t-transparent rounded-full w-8 h-8"></div>
        </div>
        <div className="text-terminal-green-dim font-mono text-sm">
          Initializing portfolio system<span className="loading-dots"></span>
        </div>
      </div>
    </div>
  );
};