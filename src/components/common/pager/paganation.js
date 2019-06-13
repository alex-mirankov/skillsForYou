import React from 'react';
import Pager from './pager-component'

export function Pagination({page, pages}){

    function handlePageChanged(newPage) {

	}

    if(pages<=1){
        return null;
    }
    return (
        <Pager
            total={pages}
            current={page}
            visiblePages={pages}
            className="pagination-sm pull-right"
            onPageChanged={handlePageChanged}
        />
    );
}