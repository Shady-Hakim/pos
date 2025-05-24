import { Tabs } from 'expo-router';
import React, { useMemo } from 'react';
import { Platform } from 'react-native';
import { useSelector } from 'react-redux';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { RootState } from '@/store';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const cartItemsObject = useSelector((state: RootState) => state.cart.items);

  const cartItems = useMemo(
    () => Object.values(cartItemsObject),
    [cartItemsObject]
  );

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="cart.fill" color={color} />
          ),
          tabBarBadge: cartItems.length > 0 ? cartItems.length : undefined,
        }}
      />
    </Tabs>
  );
}
