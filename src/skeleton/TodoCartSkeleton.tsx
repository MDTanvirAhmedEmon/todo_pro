const TodoCartSkeleton = () => {
    return (
        <div className="mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="flex items-start justify-between mb-2">
                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                    <div className="flex items-center gap-2 ml-4">
                        <div className="h-4 w-10 bg-gray-200 rounded animate-pulse" />
                        <div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
                    </div>
                </div>

                <div className="h-3 w-full bg-gray-200 rounded mb-3 animate-pulse" />
                <div className="h-3 w-2/3 bg-gray-200 rounded mb-3 animate-pulse" />

                <div className="flex flex-wrap items-center gap-2 mb-3">
                    <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse" />
                    <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse" />
                    <div className="h-6 w-24 bg-gray-200 rounded-full animate-pulse" />
                </div>

                <div className="flex flex-wrap gap-2 mb-2">
                    <div className="h-5 w-12 bg-gray-200 rounded-full animate-pulse" />
                    <div className="h-5 w-16 bg-gray-200 rounded-full animate-pulse" />
                    <div className="h-5 w-10 bg-gray-200 rounded-full animate-pulse" />
                </div>
                
                <div className="flex gap-4">
                    <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
                    <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
                </div>
            </div>
        </div>
    );
};

export default TodoCartSkeleton;
