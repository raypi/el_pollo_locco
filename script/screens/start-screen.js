/**
 * Represents the start screen of the game.
 * Handles the main menu with buttons for starting the game and accessing other screens.
 */
class StartScreen {
    /**
     * Creates a new StartScreen instance.
     * @param {HTMLCanvasElement} canvas - The canvas element to render the screen on.
     * @param {Function} startGameCallback - Callback function for the "Start" button.
     */
    constructor(canvas, startGameCallback) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.startGameCallback = startGameCallback;
      AudioHub.stopOneSound(AudioHub.GAMEMUSIC);
      this.musicOn = localStorage.getItem('musicOn') === 'true';
      this.backgroundImage = new Image();
      this.backgroundImage.src = 'assets/img/9_intro_outro_screens/start/startscreen_1.png';
      this.initButtons();
      this.hoveredButton = null;
      this.backgroundImage.onload = () => this.draw();
      this.setBindings();
      this.addEventListeners();
    }
    
    /**
     * Sets up event handler bindings.
     */
    setBindings() {
      this.boundHandleClick = this.handleClick.bind(this);
      this.boundHandleMouseMove = this.handleMouseMove.bind(this);
      this.boundHandleTouchStart = this.handleTouchStart.bind(this);
      this.boundHandleTouchMove = this.handleTouchMove.bind(this);
    }
    
    /**
     * Initializes the buttons with their labels and actions.
     */
    initButtons() {
      this.buttons = [
        { label: 'Start', action: () => { this.removeEventListeners(); AudioHub.playOneSound(AudioHub.GAMEMUSIC); this.startGameCallback(); } },
        { label: 'Steuerung', action: () => this.showControls() },
        { label: 'Erklärung', action: () => this.showExplanation() },
        { label: this.musicOn ? 'Sound aus' : 'Sound an', action: () => this.toggleSound() },
        { label: 'Impressum', action: () => this.showImpressum() },
      ];
    }
    
    /**
     * Shows the start screen and updates the music status.
     */
    show() {
      AudioHub.stopOneSound(AudioHub.GAMEMUSIC);
      this.musicOn = localStorage.getItem('musicOn') === 'true';
      this.buttons[3].label = this.musicOn ? 'Sound aus' : 'Sound an';
      this.canvas.onclick = null;
      this.addEventListeners();
      this.draw();
    }
    
    /**
     * Draws the complete start screen.
     */
    draw() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.font = '30px Arial';
      this.ctx.textAlign = 'center';
      this.buttons.forEach((btn, i) => this.drawButton(btn, i));
    }
    
    /**
     * Draws a single button.
     * @param {Object} button - The button object.
     * @param {number} index - The index of the button.
     */
    drawButton(button, index) {
      const x = this.canvas.width / 2;
      const y = 200 + index * 50;
      button.x = x - 100;
      button.y = y - 30;
      button.width = 240;
      button.height = 60;
      this.ctx.fillStyle = (this.hoveredButton === index) ? 'yellow' : 'white';
      this.ctx.font = '32px Arial';
      this.ctx.fillText(button.label, x, y);
    }
    
    /**
     * Handles click events on the start screen.
     * @param {MouseEvent} event - The click event.
     */
    handleClick(event) {
      const rect = this.canvas.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const clickY = event.clientY - rect.top;
      this.buttons.forEach(button => {
        if (clickX > button.x && clickX < button.x + button.width &&
            clickY > button.y && clickY < button.y + button.height)
          button.action();
      });
    }
    
    /**
     * Handles mouse movement events to detect button hover.
     * @param {MouseEvent} event - The mouse move event.
     */
    handleMouseMove(event) {
      const rect = this.canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;
      this.hoveredButton = null;
      this.buttons.forEach((button, index) => {
        if (mouseX > button.x && mouseX < button.x + button.width &&
            mouseY > button.y && mouseY < button.y + button.height)
          this.hoveredButton = index;
      });
      this.draw();
    }
    
    /**
     * Gets the scaled touch coordinates relative to the canvas.
     * @param {Touch} touch - The touch object.
     * @returns {Object} The scaled coordinates.
     */
    getTouchCoordinates(touch) {
      const rect = this.canvas.getBoundingClientRect();
      const scaleX = this.canvas.width / rect.width;
      const scaleY = this.canvas.height / rect.height;
      return { x: (touch.clientX - rect.left) * scaleX, y: (touch.clientY - rect.top) * scaleY, clientX: touch.clientX, clientY: touch.clientY };
    }
    
    /**
     * Handles touch start events on the start screen.
     * @param {TouchEvent} event - The touch start event.
     */
    handleTouchStart(event) {
      event.preventDefault();
      const touch = event.changedTouches[0];
      const coords = this.getTouchCoordinates(touch);
      let clicked = false;
      this.buttons.forEach(button => {
        if (coords.x >= button.x && coords.x <= button.x + button.width &&
            coords.y >= button.y && coords.y <= button.y + button.height) {
          clicked = true;
          button.action();
        }
      });
      if (!clicked) this.handleClick({ clientX: coords.clientX, clientY: coords.clientY });
    }
    
    /**
     * Handles touch move events on the start screen.
     * @param {TouchEvent} event - The touch move event.
     */
    handleTouchMove(event) {
      event.preventDefault();
      const touch = event.changedTouches[0];
      this.handleMouseMove({ clientX: touch.clientX, clientY: touch.clientY });
    }
    
    /**
     * Shows the controls screen.
     */
    showControls() {
      this.removeEventListeners();
      screenManager.showControlsScreen();
    }
    
    /**
     * Shows the explanation screen.
     */
    showExplanation() {
      this.removeEventListeners();
      screenManager.showExplanationScreen();
    }
    
    /**
     * Shows the impressum screen.
     */
    showImpressum() {
      this.removeEventListeners();
      screenManager.showImpressumScreen();
    }
    
    /**
     * Toggles the sound on/off and updates the button label.
     */
    toggleSound() {
      try {
        AudioHub.stopOneSound(AudioHub.GAMEMUSIC);
        this.musicOn = !this.musicOn;
        this.buttons[3].label = this.musicOn ? 'Sound aus' : 'Sound an';
        localStorage.setItem('musicOn', this.musicOn);
        this.draw();
      } catch (error) {
        // Handle error silently
      }
    }
    
    /**
     * Adds event listeners for mouse and touch events.
     */
    addEventListeners() {
      this.canvas.addEventListener('click', this.boundHandleClick);
      this.canvas.addEventListener('mousemove', this.boundHandleMouseMove);
      this.canvas.addEventListener('touchstart', this.boundHandleTouchStart);
      this.canvas.addEventListener('touchmove', this.boundHandleTouchMove);
    }
    
    /**
     * Removes event listeners for mouse and touch events.
     */
    removeEventListeners() {
      this.canvas.removeEventListener('click', this.boundHandleClick);
      this.canvas.removeEventListener('mousemove', this.boundHandleMouseMove);
      this.canvas.removeEventListener('touchstart', this.boundHandleTouchStart);
      this.canvas.removeEventListener('touchmove', this.boundHandleTouchMove);
    }
  }
