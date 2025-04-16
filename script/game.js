let canvas;
let world;
let keyboard = new Keyboard();
let screenManager;

/**
 * Initializes the game by setting up the canvas, screen manager, event listeners, and mobile buttons.
 */
function init() {
    canvas = document.getElementById('canvas');
    screenManager = new ScreenManager(canvas);
    screenManager.showStartScreen();
    window.addEventListener("orientationchange", checkOrientation);
    window.addEventListener("resize", checkOrientation);
    window.addEventListener('keydown', keyboardKeyDown);
    window.addEventListener('keyup', keyboardKeyUp);
    startOrientationCheck();
    initMobileButtons();
}

/**
 * Starts the orientation check for mobile and tablet devices.
 * Sets up an interval to periodically check the device orientation.
 */
function startOrientationCheck() {
    const isMobileOrTabletDevice = (function() {
        const hasTouchEvents = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
        const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
        const isMobileUserAgent = mobileRegex.test(navigator.userAgent);
        const isIPad = /iPad/i.test(navigator.userAgent) || ((/Macintosh/i.test(navigator.userAgent) && hasTouchEvents));
        const isTabletSize = window.innerWidth <= 1366 && window.innerHeight <= 1024;
        return isMobileUserAgent || isIPad || (hasTouchEvents && isTabletSize);
    })();
    if (isMobileOrTabletDevice) {
        setInterval(checkOrientation, 2000);
    }
}

/**
 * Checks the current device orientation and updates the screen accordingly.
 */
function checkOrientation() {
    screenManager.checkOrientation();
}

/**
 * Starts a new game by stopping all sounds, ending the current game if it exists, and starting a fresh game.
 */
function newGame(){
    AudioHub.stopAllSounds();
    if (world && world.stopGame) { world.stopGame(); }
    startGame();
}

/**
 * Starts the game by creating a new level and world, and showing mobile controls if needed.
 */
function startGame() {
    level001 = createLevel001();
    world = new World(canvas, keyboard);
    showMobileControls();
}

/**
 * Determines whether mobile controls should be shown based on device type and screen size.
 * @returns {boolean} True if mobile controls should be shown, false otherwise.
 */
function getShouldShowControls() {
    const t = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
    const r = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    const ua = navigator.userAgent;
    const isMobile = r.test(ua);
    const isIPad = /iPad/i.test(ua) || ((/Macintosh/i.test(ua) && t));
    const size = window.innerWidth <= 1366 && window.innerHeight <= 1024;
    return isMobile || isIPad || (t && size);
}

/**
 * Shows or hides mobile controls based on the device type and screen size.
 */
function showMobileControls() {
    const shouldShowControls = getShouldShowControls();
    if (shouldShowControls) {
        document.getElementById('mobile-controls').style.display = 'flex';
    } else {
        document.getElementById('mobile-controls').style.display = 'none';
    }
}

/**
 * Explicitly hides the mobile controls regardless of device type.
 */
function hideMobileControls() {
    document.getElementById('mobile-controls').style.display = 'none';
}

/**
 * Handles keyboard key down events and updates the keyboard state accordingly.
 * @param {KeyboardEvent} event - The keyboard event.
 */
function keyboardKeyDown(event) {
    if (event.keyCode == 39) keyboard.RIGHT = true;
    if (event.keyCode == 37) keyboard.LEFT = true;
    if (event.keyCode == 38) keyboard.UP = true;
    if (event.keyCode == 40) keyboard.DOWN = true;
    if (event.keyCode == 32) keyboard.SPACE = true;
    if (event.keyCode == 77) keyboard.M = true;
    if (event.keyCode == 78) keyboard.N = true;
}

/**
 * Handles keyboard key up events and updates the keyboard state accordingly.
 * @param {KeyboardEvent} event - The keyboard event.
 */
function keyboardKeyUp(event) {
    if (event.keyCode == 39) keyboard.RIGHT = false;
    if (event.keyCode == 37) keyboard.LEFT = false;
    if (event.keyCode == 38) keyboard.UP = false;
    if (event.keyCode == 40) keyboard.DOWN = false;
    if (event.keyCode == 32) keyboard.SPACE = false;
    if (event.keyCode == 77) keyboard.M = false;
    if (event.keyCode == 78) keyboard.N = false;
}

/**
 * Adds touch event listeners to a mobile button element.
 * @param {string} id - The ID of the button element.
 * @param {string} prop - The keyboard property to update.
 * @param {boolean} onVal - The value to set when touched.
 * @param {boolean} offVal - The value to set when touch ends.
 */
function addTouchListener(id, prop, onVal, offVal) {
    const btn = document.getElementById(id);
    if (btn) {
        btn.addEventListener('touchstart', e => { e.preventDefault(); keyboard[prop] = onVal; });
        btn.addEventListener('touchend', e => { e.preventDefault(); keyboard[prop] = offVal; });
    }
}

/**
 * Initializes the mobile control buttons by adding touch event listeners.
 */
function initMobileButtons() {
    addTouchListener('btnLeft', 'LEFT', true, false);
    addTouchListener('btnUp', 'SPACE', true, false);
    addTouchListener('btnRight', 'RIGHT', true, false);
    addTouchListener('btnBottle', 'N', true, false);
}

window.addEventListener('load', init);

window.addEventListener('keyup', (event) => {
    if (event.keyCode == 39) keyboard.RIGHT = false;
    if (event.keyCode == 37) keyboard.LEFT = false;
    if (event.keyCode == 38) keyboard.UP = false;
    if (event.keyCode == 40) keyboard.DOWN = false;
    if (event.keyCode == 32) keyboard.SPACE = false;
    if (event.keyCode == 77) keyboard.M = false;
    if (event.keyCode == 78) keyboard.N = false;
});
