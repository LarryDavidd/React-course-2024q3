import { UseLocalStorage } from '@/components/shared/lib';
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('UseLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should set item in localStorage', () => {
    const { result } = renderHook(() => UseLocalStorage());
    const { set } = result.current;

    act(() => {
      set('testKey', { name: 'Rick', age: 70 });
    });

    expect(localStorage.getItem('testKey')).toEqual(JSON.stringify({ name: 'Rick', age: 70 }));
  });

  it('should load item from localStorage', () => {
    localStorage.setItem('testKey', JSON.stringify({ name: 'Rick', age: 70 }));

    const { result } = renderHook(() => UseLocalStorage());
    const { load } = result.current;

    const data = load<{ name: string; age: number }>('testKey');
    expect(data).toEqual({ name: 'Rick', age: 70 });
  });

  it('should return null if item does not exist in localStorage', () => {
    const { result } = renderHook(() => UseLocalStorage());
    const { load } = result.current;

    const data = load<{ name: string; age: number }>('nonExistentKey');
    expect(data).toBeNull();
  });

  it('should remove item from localStorage', () => {
    localStorage.setItem('testKey', JSON.stringify({ name: 'Rick', age: 70 }));

    const { result } = renderHook(() => UseLocalStorage());
    const { remove } = result.current;

    act(() => {
      remove('testKey');
    });

    expect(localStorage.getItem('testKey')).toBeNull();
  });
});
