import { getStockists } from '@/lib/queries/stockists';
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stockists.map(stockist => (
                <Card key={stockist.id} className="h-full">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold text-gray-900">
                            {stockist.name}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription className="text-gray-600">
                            <div className="flex items-start gap-2">
                                <svg 
                                    className="w-4 h-4 mt-0.5 text-gray-400 shrink-0" 
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
                        </CardDescription>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

export default StockistsLists