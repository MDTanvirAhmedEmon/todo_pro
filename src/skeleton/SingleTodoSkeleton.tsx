const SingleTodoSkeleton = () => {
    return (
        <div className="max-w-4xl mx-auto p-4 md:p-10 space-y-4">
            <div className="animate-pulse bg-gray-300 dark:bg-gray-700 h-6 w-1/3 rounded"></div>
            <div className="animate-pulse bg-gray-300 dark:bg-gray-700 h-4 w-full rounded"></div>
            <div className="animate-pulse bg-gray-300 dark:bg-gray-700 h-4 w-full rounded"></div>
            <div className="animate-pulse bg-gray-300 dark:bg-gray-700 h-4 w-2/3 rounded"></div>
            
            <div className="flex gap-2 mt-2">
                <div className="animate-pulse bg-gray-300 dark:bg-gray-700 h-5 w-16 rounded-full"></div>
                <div className="animate-pulse bg-gray-300 dark:bg-gray-700 h-5 w-16 rounded-full"></div>
                <div className="animate-pulse bg-gray-300 dark:bg-gray-700 h-5 w-16 rounded-full"></div>
            </div>
            
            <div className="animate-pulse bg-gray-300 dark:bg-gray-700 h-4 w-1/4 rounded mt-4"></div>
        </div>
    );
};

export default SingleTodoSkeleton;
