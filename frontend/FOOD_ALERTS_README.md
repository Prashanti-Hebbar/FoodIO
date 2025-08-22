# 🍽️ Food-Themed Alert System

## Overview
Replace all default browser alerts (`alert()`, `window.confirm()`) with beautiful, food-themed custom alerts that match your app's aesthetic.

## ✨ Features
- **Food-themed styling** with gradient borders and food emojis
- **Smooth animations** with bounce effects and floating elements
- **Dark/Light theme support** that adapts to your app's theme
- **Auto-close functionality** for non-confirmation alerts
- **Responsive design** for mobile and desktop
- **Multiple alert types** for different use cases

## 🚀 Quick Start

### 1. Import the Hook
```jsx
import { useFoodAlertContext } from '../context/FoodAlertContext';

function YourComponent() {
  const { showSuccess, showFavorite, showSave, showWarning, showConfirmation } = useFoodAlertContext();
  
  // Use the alerts...
}
```

### 2. Replace Default Alerts

#### Before (Default Browser Alert):
```jsx
// ❌ Old way
alert("Recipe saved successfully!");
window.confirm("Are you sure you want to delete?");

// ✅ New way
showSuccess("Recipe Saved!", "Your recipe has been saved successfully!");
showConfirmation("Delete Recipe", "Are you sure you want to delete this recipe?", "Delete", handleDelete);
```

## 🎯 Alert Types

### Success Alerts
```jsx
showSuccess("Success!", "Operation completed successfully!");
```

### Favorite Alerts
```jsx
showFavorite("Added to Favorites! ❤️", "Recipe has been added to your favorites.");
showFavorite("Removed from Favorites 💔", "Recipe has been removed from your favorites.");
```

### Save Alerts
```jsx
showSave("Recipe Saved! 📚", "Recipe has been saved for later.");
showSave("Recipe Unsaved 📖", "Recipe has been removed from saved items.");
```

### Warning Alerts
```jsx
showWarning("Warning!", "Please check your input and try again.");
```

### Confirmation Alerts
```jsx
showConfirmation(
  "Delete Recipe", 
  "Are you sure you want to delete this recipe? This action cannot be undone.", 
  "Delete", 
  () => handleDelete(recipeId)
);
```

## 🔧 Customization

### Custom Alert with All Options
```jsx
const { showAlert } = useFoodAlertContext();

showAlert({
  type: 'success',           // 'success', 'favorite', 'save', 'warning'
  title: 'Custom Title',
  message: 'Custom message here',
  action: 'Confirm',         // Button text for confirmation alerts
  showConfirmButton: true,   // Show confirm/cancel buttons
  onConfirm: () => {         // Function to run on confirm
    console.log('Confirmed!');
  }
});
```

## 📱 Responsive Behavior
- **Desktop**: Horizontal layout with icon and text side by side
- **Mobile**: Vertical layout with centered content
- **Auto-close**: Non-confirmation alerts close after 4 seconds
- **Manual close**: Users can click the X button or outside the alert

## 🎨 Styling Features
- **Gradient borders** with animated glow effects
- **Food emojis** (🍽️) that float above the alert
- **Icon animations** with bounce and heartbeat effects
- **Smooth transitions** with cubic-bezier easing
- **Backdrop blur** for modern glass-morphism effect

## 🌙 Theme Support
The alerts automatically adapt to your app's theme:
- **Light theme**: Clean white background with subtle shadows
- **Dark theme**: Dark backgrounds with appropriate contrast

## 📍 Usage Examples

### Recipe Favorites
```jsx
const handleFavorite = (recipe) => {
  if (recipe.isFavorite) {
    removeFromFavorites(recipe.id);
    showFavorite("Removed from Favorites 💔", `${recipe.title} is no longer in your favorites.`);
  } else {
    addToFavorites(recipe.id);
    showFavorite("Added to Favorites! ❤️", `${recipe.title} has been added to your favorites!`);
  }
};
```

### Form Validation
```jsx
const handleSubmit = (formData) => {
  if (!formData.title) {
    showWarning("Missing Information", "Please provide a recipe title.");
    return;
  }
  
  if (saveRecipe(formData)) {
    showSuccess("Recipe Saved!", "Your recipe has been saved successfully!");
  }
};
```

### Delete Confirmation
```jsx
const handleDeleteClick = (recipeId) => {
  showConfirmation(
    "Delete Recipe",
    "Are you sure you want to delete this recipe? This action cannot be undone.",
    "Delete",
    () => deleteRecipe(recipeId)
  );
};
```

### Login Success
```jsx
const handleLogin = async (credentials) => {
  try {
    await loginUser(credentials);
    showSuccess("Welcome Back! 👨‍🍳", "You have been successfully logged in.");
    navigate('/dashboard');
  } catch (error) {
    showWarning("Login Failed", "Please check your credentials and try again.");
  }
};
```

## 🚫 What to Replace
Replace these default browser alerts throughout your app:

### ❌ Remove These:
```jsx
alert("Message here");
window.confirm("Are you sure?");
window.prompt("Enter value:");
```

### ✅ Use These Instead:
```jsx
showSuccess("Title", "Message");
showConfirmation("Title", "Message", "Action", callback);
showWarning("Title", "Message");
```

## 🔄 Migration Checklist
- [ ] Replace `alert()` with appropriate food alert type
- [ ] Replace `window.confirm()` with `showConfirmation()`
- [ ] Update error messages to use `showWarning()`
- [ ] Update success messages to use `showSuccess()`
- [ ] Test all alert types in both light and dark themes
- [ ] Verify mobile responsiveness

## 🎉 Benefits
1. **Consistent Design**: All alerts match your food app's aesthetic
2. **Better UX**: Smooth animations and food-themed elements
3. **Accessibility**: Proper ARIA labels and keyboard navigation
4. **Theme Integration**: Seamlessly works with your light/dark theme
5. **Mobile Friendly**: Responsive design for all screen sizes
6. **Professional Look**: No more jarring browser default alerts

## 🐛 Troubleshooting

### Alert Not Showing?
- Ensure you're using the hook within a component wrapped by `FoodAlertProvider`
- Check that `useFoodAlertContext()` is called at the top level of your component

### Styling Issues?
- Verify the CSS file is imported correctly
- Check that your app has the `data-theme` attribute set for theme support

### Performance Issues?
- Alerts are optimized with proper cleanup and memory management
- Auto-close timers are properly cleared on component unmount

---

**Happy Cooking! 🍳✨**
