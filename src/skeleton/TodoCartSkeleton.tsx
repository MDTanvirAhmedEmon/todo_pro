const TodoCartSkeleton = () => {
    return (
        <div className="animate-pulse bg-white rounded-xl shadow-sm p-4 space-y-4 border border-gray-200">
            <div className="h-5 w-3/4 bg-gray-200 rounded"></div>
            <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
            <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
            <div className="flex justify-between items-center pt-3">
                <div className="h-6 w-16 bg-gray-200 rounded"></div>
                <div className="h-6 w-16 bg-gray-200 rounded"></div>
            </div>
            <div className="flex space-x-2 pt-2">
                <div className="h-4 w-10 bg-gray-200 rounded"></div>
                <div className="h-4 w-12 bg-gray-200 rounded"></div>
            </div>
            <div className="h-3 w-1/2 bg-gray-200 rounded pt-2"></div>
        </div>
    );
};

export default TodoCartSkeleton;
