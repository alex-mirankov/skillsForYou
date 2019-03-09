import { OPEN_MODAL_WINDOW, CLOSE_MODAL_WINDOW } from './index';

export const openWindow = () => {
    return {
        type: OPEN_MODAL_WINDOW,
    }
}

export const closeWindow = () => {
    return {
        type: CLOSE_MODAL_WINDOW
    }
}
