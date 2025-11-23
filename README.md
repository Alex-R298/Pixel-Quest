# Pixel Quest

A 2D platformer game built with vanilla JavaScript and HTML5 Canvas. Guide your Owlet Monster character through challenging levels, collect coins, and defeat the endboss!

## 🎮 Game Features

- **Smooth character animations** - Idle, running, jumping, climbing, attacking, and hurt states
- **Combat system** - Attack enemies with special moves
- **Collectible items** - Gather coins and power-ups throughout the level
- **Energy system** - Health bar and status tracking
- **Platform mechanics** - Jump across platforms and climb ladders
- **Enemy AI** - Face off against mushroom enemies and the final boss
- **Audio effects** - Background music and sound effects for actions
- **Responsive controls** - Keyboard and mobile touch controls support
- **Fullscreen mode** - Immersive gaming experience

## 🕹️ Controls

### Keyboard Controls
- **A** - Move left
- **D** - Move right
- **W** - Climb up (when on ladder)
- **S** - Climb down (when on ladder)
- **SPACE** - Jump
- **ENTER** - Attack

### Mobile Controls
Touch buttons are displayed on mobile devices for movement, jumping, and climbing.

##  Project Structure

```
Pixel_Quest/
├── index.html              # Main HTML file
├── style.css               # Custom styles
├── audio/                  # Sound effects and music
├── img/                    # Game assets and sprites
│   ├── Owlet_Monster/      # Player character sprites
│   ├── Small_Mushroom/     # Enemy sprites
│   ├── Background/         # Background layers
│   ├── Objects/            # Game objects (boxes, food, etc.)
│   └── Icons/              # UI icons
├── js/
│   ├── game.js             # Main game logic
│   └── game-ui.js          # UI management
├── models/
│   ├── character.class.js          # Player character
│   ├── movable-object.class.js     # Base movable object
│   ├── endboss.class.js            # Boss enemy
│   ├── smallMushroom.class.js      # Regular enemies
│   ├── world.class.js              # Game world
│   ├── level.class.js              # Level structure
│   └── levels/
│       └── level1.js               # Level 1 configuration
└── style/
    ├── standard.css        # Base styles
    └── animation.css       # Animation styles
```

## 🎨 Game Assets

The game features custom pixel art including:
- Animated character sprites (Owlet Monster)
- Enemy characters (Mushrooms, Boss)
- Layered parallax backgrounds
- Interactive platforms and ladders
- Collectible coins and items
- UI elements and status bars

## 🛠️ Technologies Used

- **HTML5 Canvas** - Game rendering
- **Vanilla JavaScript** - Game logic and mechanics
- **CSS3** - Styling and animations
- **Object-Oriented Programming** - Clean, modular code structure

## 🎯 Game Mechanics

### Character System
- Health and energy management
- Multiple animation states with sprite sheets
- Collision detection with enemies and platforms
- Attack cooldown system

### Enemy AI
- Patrol behavior for regular enemies
- Boss fight mechanics
- Damage and defeat systems

### Level Design
- Platform-based level structure
- Climbing mechanics with ladders
- Strategic item placement
- Progressive difficulty

## 🎵 Audio

The game includes:
- Background music for menus and gameplay
- Sound effects for:
  - Jumping
  - Walking
  - Attacking
  - Taking damage
  - Collecting items
  - Button clicks

## 📱 Mobile Support

The game automatically detects mobile devices and provides:
- Touch-based control buttons
- Responsive canvas sizing
- Optimized performance for mobile browsers

## 🔧 Development

### Class Structure

The game uses an object-oriented approach with the following main classes:

- `DrawableObject` - Base class for all drawable entities
- `MovableObject` - Extends DrawableObject with movement capabilities
- `Character` - Player character with all actions
- `CharacterActions` - Handles character behavior and state management
- `World` - Manages game world, collisions, and interactions
- `Level` - Defines level structure and objects
- `Enemy classes` - Various enemy types with AI
- `StatusBar` - UI elements for health/energy display

## 🐛 Known Issues

Feel free to report any bugs or issues in the [Issues](https://github.com/Alex-R298/Pixel-Quest/issues) section.

## 📝 License

This project is created for educational purposes.

## 👤 Author

**Alex-R298**
- GitHub: [@Alex-R298](https://github.com/Alex-R298)

## 🙏 Acknowledgments

- Pixel art assets and sprite animations
- Sound effects and background music
- Inspiration from classic platformer games

---

Enjoy playing Pixel Quest! 🎮✨
