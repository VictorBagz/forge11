# Image Storage Guide

## Directory Structure

```
public/
└── images/
    ├── hostels/          # Hostel property images
    ├── community/        # Community posts and events
    ├── students/         # Student spotlight profiles
    └── hero/            # Hero section images
```

## Image Organization

### Hostels (`/public/images/hostels/`)
- `douglas-villa.jpg`
- `olympia-hostel.jpg`
- `banda-executive.jpg`
- `valley-view.jpg`
- `skyline-premium.jpg`

### Community (`/public/images/community/`)
- `library-wings.jpg` (News)
- `freshers-ball.jpg` (Event)

### Students (`/public/images/students/`)
- `namono-sarah.jpg`
- `okello-john.jpg`

### Hero Section (`/public/images/hero/`)
- `main-hero.jpg` (Landing page hero image)

## How to Use

Replace URLs in your code from:
```typescript
image: 'https://images.unsplash.com/...'
```

To:
```typescript
image: '/images/hostels/douglas-villa.jpg'
```

## Image Specifications

- **Hostel Cards**: 800x600px
- **Community Posts**: 600x400px
- **Student Profiles**: 400x400px (square)
- **Hero Image**: 1200x600px

All images should be optimized for web (compressed, appropriate format).

## Adding New Images

1. Place image file in appropriate subfolder
2. Update references in `data.ts`
3. Ensure image follows the size specifications above
