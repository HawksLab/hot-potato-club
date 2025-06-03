import CustomSplash from '@/components/CustomSplash';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Show splash screen for 2.5 seconds then navigate to the main app
    const timer = setTimeout(() => {
      setIsLoading(false);
      router.replace('/home'); // Navigate to your main app screen
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // Show the custom splash screen during the loading period
  return <CustomSplash />;
}
