const Loading = ({ message = 'Loading...' }) => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <div className="inline-block relative">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-blue-600 rounded-full animate-pulse"></div>
          </div>
        </div>
        <p className="mt-6 text-lg font-medium text-gray-700">{message}</p>
        <p className="mt-2 text-sm text-gray-500">Please wait...</p>
      </div>
    </div>
  )
}

export default Loading
