// Placeholder photography — swap `image` for the business's real photos before launch.
// Picsum photos are random stock (not keyword-matched), so each tile also carries an
// `icon` name (rendered by CategoryTile) to make the subject unmistakable regardless
// of the background photo — computer, camera, printer, etc.
export const categoryVisuals = {
  'govt-documentation': {
    image: 'https://picsum.photos/id/24/800/1000',      // desk / laptop / paperwork
    color: 'from-primary-dark/10 to-primary-dark',
    tag: 'bg-primary text-white',
    icon: 'FileCheck2',
  },
  'pension-welfare': {
    image: 'https://picsum.photos/id/342/800/1000',      // warm community feel
    color: 'from-warning/10 to-warning',
    tag: 'bg-warning text-white',
    icon: 'HeartHandshake',
  },
  'banking-services': {
    image: 'https://picsum.photos/id/1/800/1000',        // laptop/tech desk
    color: 'from-teal/10 to-teal-dark',
    tag: 'bg-teal text-white',
    icon: 'Landmark',
  },
  printing: {
    image: 'https://picsum.photos/id/48/800/1000',       // printer/office equipment feel
    color: 'from-marigold/10 to-marigold-dark',
    tag: 'bg-marigold text-white',
    icon: 'Printer',
  },
  photography: {
    image: 'https://picsum.photos/id/250/800/1000',      // camera/studio gear
    color: 'from-coral/10 to-coral-dark',
    tag: 'bg-coral text-white',
    icon: 'Camera',
  },
  'designing-cards': {
    image: 'https://picsum.photos/id/1048/800/1000',     // colorful/festive
    color: 'from-accent/10 to-accent',
    tag: 'bg-accent text-white',
    icon: 'PenTool',
  },
  'other-digital': {
    image: 'https://picsum.photos/id/96/800/1000',       // mobile/tech
    color: 'from-primary/10 to-primary',
    tag: 'bg-primary-dark text-white',
    icon: 'Smartphone',
  },
};