//modal
const modal = document.querySelector('.modal');
const btnWatch = document.querySelector('.btn-watch');
const btnClose = document.querySelector('.btn-close');

btnWatch.addEventListener('click', () => {
    modal.classList.add('modal-open');
})

btnClose.addEventListener('click', () => {
    modal.classList.remove('modal-open');
    modal.querySelector('video').pause();
})

// video plugin
let playVideo = false;

const videoPath = {
    mp4: 'video/video.mp4',
    webm: 'video/video.webm',
    ogv: 'video/video.ogv'
}

// const videoOpt = {
//     posterType: 'none'
// }

const maxWidth = "(max-width: 900px)";
const minWidth = "(min-width: 900px)";
const windowSize  = (width) => window.matchMedia(width).matches;

const createVideo = (path, set) => {
    const styleWrapper = {
        position: 'absolute',
        zIndex: '-1',
        inset: '0px',
        overflow: 'hidden',
        backgroundSize: 'cover',
        backgroundColor: 'transparent',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50% 50%',
        backgroundImage: 'none'
    }
    const styleVideo = {
        margin: 'auto',
        position: 'absolute',
        zIndex: '-1',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        visibility: 'visible',
        opacity: '1',
        width: 'auto',
        height: '100%'
    }
    const opt = {};
    const def = {
        autoplay: true,
        loop: true,
        muted: true,
        className: false,
        poster: false,
        controls: false
    }
    
    if (set) {
        for (var k in def) {
            if (set.hasOwnProperty(k)) {
                opt[k] = set[k];                
            } else {
                opt[k] = def[k];
            }
        }
    } else {
        for (var k in def) {
            opt[k] = def[k];
        }
    }

    const wrapper = document.createElement('div');
    const video = document.createElement('video');
    
    video.innerHTML = `
        <source src="${path.mp4}" type="video/mp4">
        <source src="${path.ogv}" type="video/ogv">
        <source src="${path.webm}" type="video/webm">
    `;
    
    for (let key in opt) {
        if (opt[key]) {
            if (key === 'className') {
                wrapper.classList.add(opt[key]);
            } else if (key === 'poster') {
                styleWrapper.backgroundImage = `url(${opt[key]})`;
            }
            video.setAttribute(key, '');
        }
    }

    Object.assign(wrapper.style, styleWrapper);
    Object.assign(video.style, styleVideo);

    wrapper.appendChild(video);
    return wrapper;
}

// const initVideo = (path, opt) => {
//     if (windowSize(minWidth)) {
//         $('.header').vide(path, opt);
//         instance = $('.header').data('vide');
//         console.log('init');
//         window.addEventListener('resize', function () {
//             if (windowSize(maxWidth) && instance !== false) {
//                 instance.destroy();
//                 instance = false;
//                 console.log('max-width');
//             }
//             if (windowSize(minWidth) && instance === false) {
//                 $('.header').vide(path, opt);
//                 instance = $('.header').data('vide');
//                 console.log('min-width');
//             }
//         });
//     }
// }

//initVideo(videoPath, videoOpt);

const header = document.querySelector('.header');

const initVideo = (el, path, opt) => {
    const bcgVideo = createVideo(path, opt);
    if (windowSize(minWidth)) {
        el.prepend(bcgVideo);
        playVideo = true;
    }
    window.addEventListener('resize', function () {
        if (windowSize(maxWidth) && playVideo !== false) {
            el.children[0].remove();
            playVideo = false;
        }
        if (windowSize(minWidth) && playVideo === false) {
            el.prepend(bcgVideo);
            el.querySelector('video').play();
            playVideo = true;
        }
    });    
}

initVideo(header, videoPath);


