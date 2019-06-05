import React from 'react';
import PropTypes from 'prop-types';
import './style.css'

const BASE_SHIFT  = 0;
const TITLE_SHIFT = 1;

const TITLES = {
	first:   'First',
	prev:    '\u00AB',
	prevSet: '...',
	nextSet: '...',
	next:    '\u00BB',
	last:    'Last',
};

class Pager extends React.Component {

	getTitles=(key)=> {
		return this.props.titles[key] || TITLES[key];
	}

	calcBlocks=()=> {
		const props = this.props;
		const total = props.total;
		const blockSize = props.visiblePages;
		const current = props.current;
		const blocks = Math.ceil(total / blockSize);
		const currBlock = Math.ceil(current / blockSize) - TITLE_SHIFT;

		return {
			total:    blocks,
			current:  currBlock,
			size:     blockSize,
		};
	}

	isPrevMoreHidden=()=> {
		const blocks = this.calcBlocks();
		return (blocks.total === TITLE_SHIFT) || (blocks.current === BASE_SHIFT);
	}

	isNextMoreHidden=()=>{
		const blocks = this.calcBlocks();
		return (blocks.total === TITLE_SHIFT) || (blocks.current === blocks.total);
	}

	visibleRange=()=> {
		const blocks = this.calcBlocks();
		const start = blocks.current * blocks.size;
		const delta = this.props.total - start;
		const end = start + ((delta > blocks.size) ? blocks.size : delta);

		return [start + TITLE_SHIFT, end + TITLE_SHIFT];
	}

	handleMorePrevPages=()=> {
		const blocks = this.calcBlocks();
		this.handlePageChanged((blocks.current * blocks.size) - TITLE_SHIFT);
	}

    
	handleMoreNextPages=()=> {
		const blocks = this.calcBlocks();
		this.handlePageChanged((blocks.current + TITLE_SHIFT) * blocks.size);
	}

	handlePageChanged=(num)=>{
		const handler = this.props.onPageChanged;
		if (handler) handler(num);
	}


	renderPages=(pair)=> {
		return range(pair[0], pair[1]).map((num, idx) => {
			const current = num;
			const onClick = this.handlePageChanged.bind(this, current);
			const isActive = (this.props.current === current);

			return (
				<Page
					key={idx}
					index={idx}
					isActive={isActive}
					className="btn-page btn-page-number"
					onClick={onClick}
				>{num}</Page>
			);
		});
	}


	render() {
		const titles = this.getTitles.bind(this);

		if(this.props.total < 15){
			return (
				<nav className="nav-pagination">
					<ul className="pagination">
						{this.renderPages(this.visibleRange())}
					</ul>
				</nav>
			);
		}
		return (
			<nav className="nav-pagination">
				<div className="pagination">
					
					<Page
						className="btn-page btn-prev-more btn-page_nonactive"
						key="btn-prev-more"
						isHidden={this.isPrevMoreHidden()}
						onClick={this.handleMorePrevPages}
					>{titles('prevSet')}</Page>

					{this.renderPages(this.visibleRange())}

					<Page
						className="btn-page btn-next-more btn-page_nonactive"
						key="btn-next-more"
						isHidden={this.isNextMoreHidden()}
						onClick={this.handleMoreNextPages}
					>{titles('nextSet')}</Page>

				</div>
			</nav>
		);
	}
}

Pager.propTypes = {
	current: PropTypes.number.isRequired,
	total:   PropTypes.number.isRequired,
	visiblePages: PropTypes.number.isRequired,
	titles:  PropTypes.object,
	onPageChanged: PropTypes.func,
};

Pager.defaultProps = {
	titles: TITLES,
};

const Page = (props) => {
	if (props.isHidden) return null;

	const baseCss = props.className ? `${props.className} ` : '';
	const fullCss = `${baseCss}${props.isActive ? ' btn-page_active' : 'btn-page_nonactive'}`;

	return (
		<button key={props.index} className={fullCss} onClick={props.onClick}>
			{props.children}
		</button>
	);
};

Page.propTypes = {
	isHidden:  PropTypes.bool,
	isActive:  PropTypes.bool,
	isDisabled: PropTypes.bool,
	className:  PropTypes.string,
	onClick:    PropTypes.func,
};


function range(start, end) {
	const res = [];
	for (let i = start; i < end; i++) {
		res.push(i);
	}

	return res;
}

export default Pager;