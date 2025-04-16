/**
 * Manages all screens in the game and handles transitions between them.
 * Also handles device orientation changes and appropriate screen display.
 */
class ScreenManager {
  /**
   * Creates a new ScreenManager instance.
   * @param {HTMLCanvasElement} canvas - The canvas element to render screens on.
   */
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.currentScreen = null;
    this.lastActiveScreen = null;
    this.isCheckingOrientation = false;
  }
  
  /**
   * Checks the device orientation and shows appropriate screen.
   * @returns {boolean} True if orientation changed and screen was updated, false otherwise.
   */
  checkOrientation() {
    if (this.isCheckingOrientation) return false;
    this.isCheckingOrientation = true;
    try {
      return this.checkPortrait() || this.checkLandscape();
    } finally {
      this.isCheckingOrientation = false;
    }
  }
  
  /**
   * Checks if device is in portrait mode and shows orientation screen if needed.
   * @returns {boolean} True if portrait mode was detected and screen was changed, false otherwise.
   */
  checkPortrait() {
    if (window.matchMedia("(orientation: portrait)").matches) {
      if (!(this.currentScreen instanceof OrientationScreen)) {
        if (this.currentScreen) this.lastActiveScreen = this.currentScreen;
        this.directShowOrientationScreen();
        return true;
      }
    }
    return false;
  }
  
  /**
   * Checks if device is in landscape mode and restores previous screen if needed.
   * @returns {boolean} True if landscape mode was detected and screen was changed, false otherwise.
   */
  checkLandscape() {
    if (!window.matchMedia("(orientation: portrait)").matches) {
      if (this.currentScreen instanceof OrientationScreen && this.lastActiveScreen) {
        const last = this.lastActiveScreen;
        this.lastActiveScreen = null;
        if (last instanceof StartScreen) this.directShowStartScreen();
        else if (last instanceof GameOverScreen) this.directShowGameOverScreen('character');
        else if (last instanceof ControlsScreen) this.directShowControlsScreen();
        else if (last instanceof ExplanationScreen) this.directShowExplanationScreen();
        else if (last instanceof ImpressumScreen) this.directShowImpressumScreen();
        else this.directShowStartScreen();
        return true;
      }
    }
    return false;
  }
  
  /**
   * Shows the start screen directly without orientation check.
   */
  directShowStartScreen() {
    this.stopAllGameProcesses();
    this.currentScreen = new StartScreen(this.canvas, () => { this.startGame(); });
    this.currentScreen.draw();
    this.currentScreen.show();
    hideMobileControls();
  }
  
  /**
   * Shows the start screen with orientation check.
   */
  showStartScreen() {
    if (this.checkOrientation()) return;
    this.directShowStartScreen();
  }
  
  /**
   * Stops all game processes and sounds.
   */
  stopAllGameProcesses() {
    if (typeof world !== 'undefined' && world) {
      if (world.stopGame) world.stopGame();
    }
    if (localStorage.getItem('musicOn') !== 'true') AudioHub.stopAllSounds();
  }
  
  /**
   * Starts the game with orientation check.
   */
  startGame() {
    if (this.checkOrientation()) return;
    this.stopAllGameProcesses();
    if (this.currentScreen && typeof this.currentScreen.removeEventListeners === 'function')
      this.currentScreen.removeEventListeners();
    this.canvas.onclick = null;
    this.clearCanvas();
    startGame();
    showMobileControls();
  }
  
  /**
   * Shows the game over screen directly without orientation check.
   * @param {string} type - The type of game over ('character' for player death, 'endboss' for victory).
   */
  directShowGameOverScreen(type) {
    this.stopAllGameProcesses();
    if (this.currentScreen && typeof this.currentScreen.removeEventListeners === 'function')
      this.currentScreen.removeEventListeners();
    hideMobileControls();
    this.currentScreen = new GameOverScreen(
      this.canvas,
      type,
      () => { this.newGame(); },
      () => { this.showStartScreen(); }
    );
    this.currentScreen.draw();
    if (typeof this.currentScreen.addEventListeners === 'function')
      this.currentScreen.addEventListeners();
    else this.canvas.onclick = (e) => { this.currentScreen.handleClick(e); };
  }
  
  /**
   * Shows the game over screen with orientation check.
   * @param {string} type - The type of game over ('character' for player death, 'endboss' for victory).
   */
  showGameOverScreen(type) {
    if (this.checkOrientation()) return;
    this.directShowGameOverScreen(type);
  }
  
  /**
   * Starts a new game with orientation check.
   */
  newGame() {
    if (this.checkOrientation()) return;
    this.stopAllGameProcesses();
    if (this.currentScreen && typeof this.currentScreen.removeEventListeners === 'function')
      this.currentScreen.removeEventListeners();
    this.canvas.onclick = null;
    this.clearCanvas();
    newGame();
    showMobileControls();
  }
  
  /**
   * Clears the canvas.
   */
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  
  /**
   * Shows the orientation screen directly without checks.
   */
  directShowOrientationScreen() {
    if (this.currentScreen instanceof OrientationScreen) return;
    this.stopAllGameProcesses();
    if (this.currentScreen && typeof this.currentScreen.removeEventListeners === 'function')
      this.currentScreen.removeEventListeners();
    hideMobileControls();
    this.currentScreen = new OrientationScreen(this.canvas);
    this.currentScreen.draw();
  }
  
  /**
   * Shows the orientation screen.
   */
  showOrientationScreen() {
    this.directShowOrientationScreen();
  }
  
  /**
   * Shows the impressum screen directly without orientation check.
   */
  directShowImpressumScreen() {
    this.stopAllGameProcesses();
    if (this.currentScreen && typeof this.currentScreen.removeEventListeners === 'function')
      this.currentScreen.removeEventListeners();
    hideMobileControls();
    this.clearCanvas();
    this.currentScreen = new ImpressumScreen(this.canvas, () => { this.showStartScreen(); });
    this.currentScreen.show();
  }
  
  /**
   * Shows the impressum screen with orientation check.
   */
  showImpressumScreen() {
    if (this.checkOrientation()) return;
    this.directShowImpressumScreen();
  }
  
  /**
   * Shows the controls screen directly without orientation check.
   */
  directShowControlsScreen() {
    this.stopAllGameProcesses();
    if (this.currentScreen && typeof this.currentScreen.removeEventListeners === 'function')
      this.currentScreen.removeEventListeners();
    hideMobileControls();
    this.clearCanvas();
    this.currentScreen = new ControlsScreen(this.canvas, () => { this.showStartScreen(); });
    this.currentScreen.show();
  }
  
  /**
   * Shows the controls screen with orientation check.
   */
  showControlsScreen() {
    if (this.checkOrientation()) return;
    this.directShowControlsScreen();
  }
  
  /**
   * Shows the explanation screen directly without orientation check.
   */
  directShowExplanationScreen() {
    this.stopAllGameProcesses();
    if (this.currentScreen && typeof this.currentScreen.removeEventListeners === 'function')
      this.currentScreen.removeEventListeners();
    hideMobileControls();
    this.clearCanvas();
    this.currentScreen = new ExplanationScreen(this.canvas, () => { this.showStartScreen(); });
    this.currentScreen.show();
  }
  
  /**
   * Shows the explanation screen with orientation check.
   */
  showExplanationScreen() {
    if (this.checkOrientation()) return;
    this.directShowExplanationScreen();
  }
}
