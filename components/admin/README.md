# PayloadCMS Dashboard Fallback UI

This directory contains custom fallback UI components for the PayloadCMS admin dashboard to provide a better user experience during loading states.

## Components

### PayloadLoadingFallback

A comprehensive loading skeleton that mimics the full PayloadCMS admin interface layout, including:

- Header with navigation and user info
- Sidebar with menu items
- Main content area with cards and tables
- Proper skeleton animations

**Usage:**
```tsx
import { PayloadLoadingFallback } from '@/components/admin'

<Suspense fallback={<PayloadLoadingFallback />}>
  {/* Your admin content */}
</Suspense>
```

### PayloadMinimalFallback

A minimal, centered loading indicator for simpler scenarios:

- Spinning loader
- Loading text
- Clean, centered design

**Usage:**
```tsx
import { PayloadMinimalFallback } from '@/components/admin'

<Suspense fallback={<PayloadMinimalFallback />}>
  {/* Your admin content */}
</Suspense>
```

### PayloadWrapper

A convenience wrapper component that automatically applies Suspense with fallback:

**Usage:**
```tsx
import { PayloadWrapper, PayloadLoadingFallback } from '@/components/admin'

<PayloadWrapper fallback={<PayloadLoadingFallback />}>
  {/* Your admin content */}
</PayloadWrapper>

// Or use default fallback
<PayloadWrapper>
  {/* Your admin content */}
</PayloadWrapper>
```

## Implementation Notes

Since PayloadCMS generates its own layout and page files (marked with comments like "THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD"), these components are designed to be used as replacements for the default fallbacks.

### Integration with Payload

1. **Custom Layout Wrapper** (`custom-layout.tsx`): A replacement for the generated layout that uses our enhanced fallback
2. **Custom Admin Page** (`custom-page.tsx`): A replacement for the generated admin page with better loading states
3. **PayloadWrapper**: A client-side wrapper for any additional admin components

### Customization

The fallback components use Tailwind CSS and shadcn/ui components for consistency with the rest of the application. You can customize:

- Colors by modifying Tailwind classes
- Layout by adjusting the grid and flex structures
- Animation by modifying the skeleton components
- Content by changing the number of skeleton elements

### Performance Considerations

- All components are optimized for fast rendering
- Skeleton animations are CSS-based for smooth performance
- Components use appropriate loading strategies for different content types

## File Structure

```
components/admin/
├── index.ts                     # Export file
├── payload-loading-fallback.tsx # Main fallback components
├── payload-wrapper.tsx          # Wrapper component
└── README.md                   # This documentation
```

## Best Practices

1. Use `PayloadLoadingFallback` for full admin interface pages
2. Use `PayloadMinimalFallback` for simple loading states or modal contents
3. Use `PayloadWrapper` when you need more control over the fallback implementation
4. Always test loading states in different screen sizes and themes
5. Consider accessibility - all components support dark mode and proper contrast