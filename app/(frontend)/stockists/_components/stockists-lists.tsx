import { getStockists } from '@/lib/queries/stockists';
import React from 'react'

const StockistsLists = async () => {
    "use cache";

    const stockistsData = await getStockists();

    const stockists = stockistsData?.docs || [];

    if (stockists.length === 0) {
        return (
            <div className="text-center py-12">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No stockists found</h3>
                <p className="text-gray-600">Please check back later for book stockist locations.</p>
            </div>
        );
    }

    // Group stockists by town
    const grouped = stockists.reduce<Record<string, typeof stockists>>((acc, stockist) => {
        const town = stockist.town ?? 'Other';
        if (!acc[town]) acc[town] = [];
        acc[town].push(stockist);
        return acc;
    }, {});

    // Define a preferred town order so the layout matches the client brief
    const townOrder = [
        'Cape Town',
        'Grabouw',
        'Swellendam',
        'Montagu',
        'Oudtshoorn',
        'Plettenberg Bay',
        'Clarens',
    ];

    const sortedTowns = [
        ...townOrder.filter((t) => grouped[t]),
        ...Object.keys(grouped).filter((t) => !townOrder.includes(t)),
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedTowns.map((town) => (
                <div
                    key={town}
                    className="rounded-lg border border-gray-200 overflow-hidden shadow-sm bg-white"
                >
                    {/* Yellow banner header */}
                    <div className="bg-[#c9a227] px-5 py-3">
                        <h3 className="text-lg font-bold text-white tracking-wide">
                            {town}
                        </h3>
                    </div>

                    {/* Stockist entries */}
                    <div className="divide-y divide-gray-100">
                        {grouped[town].map((stockist) => (
                            <div key={stockist.id} className="px-5 py-4 space-y-2">
                                <h4 className="font-semibold text-gray-900">
                                    {stockist.name}
                                </h4>

                                <div className="flex items-start gap-2 text-sm text-gray-600">
                                    <svg
                                        className="w-4 h-4 mt-0.5 text-[#c9a227] shrink-0"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                    <span>{stockist.address}</span>
                                </div>

                                {stockist.contact && (
                                    <div className="flex items-start gap-2 text-sm text-gray-600">
                                        <svg
                                            className="w-4 h-4 mt-0.5 text-[#c9a227] shrink-0"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                            />
                                        </svg>
                                        <span>{stockist.contact}</span>
                                    </div>
                                )}

                                {stockist.email && (
                                    <div className="flex items-start gap-2 text-sm text-gray-600">
                                        <svg
                                            className="w-4 h-4 mt-0.5 text-[#c9a227] shrink-0"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                            />
                                        </svg>
                                        <a
                                            href={`mailto:${stockist.email}`}
                                            className="hover:text-[#c9a227] transition-colors underline"
                                        >
                                            {stockist.email}
                                        </a>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default StockistsLists