import { OPEN_MODAL_WINDOW, CLOSE_MODAL_WINDOW } from '../actions/index';

const initialState = {
    open: false,
}

const modal = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_MODAL_WINDOW:
            return {
                open: true,
            }
        case CLOSE_MODAL_WINDOW:
            return {
                open: false,
            }
        default:
            return state
    }
}

export default modal;
