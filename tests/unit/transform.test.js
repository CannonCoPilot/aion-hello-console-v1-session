import { describe, it, expect } from 'vitest';
import { slugify, reverse, uppercase, wordCount, transform } from '../../src/utils/transform.js';

describe('slugify', () => {
  it('should convert basic text to slug', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });

  it('should remove special characters', () => {
    expect(slugify('Hello World!')).toBe('hello-world');
    expect(slugify('Hello, World?')).toBe('hello-world');
  });

  it('should handle multiple spaces', () => {
    expect(slugify('Hello   World')).toBe('hello-world');
  });

  it('should return empty string for empty input', () => {
    expect(slugify('')).toBe('');
  });

  it('should handle numbers in text', () => {
    expect(slugify('Hello World 123')).toBe('hello-world-123');
  });
});

describe('reverse', () => {
  it('should reverse basic text', () => {
    expect(reverse('hello')).toBe('olleh');
  });

  it('should return empty string for empty input', () => {
    expect(reverse('')).toBe('');
  });

  it('should handle single character', () => {
    expect(reverse('a')).toBe('a');
  });

  it('should preserve spaces in reversed text', () => {
    expect(reverse('hello world')).toBe('dlrow olleh');
  });
});

describe('uppercase', () => {
  it('should convert text to uppercase', () => {
    expect(uppercase('hello')).toBe('HELLO');
  });

  it('should handle mixed case', () => {
    expect(uppercase('HeLLo WoRLD')).toBe('HELLO WORLD');
  });

  it('should return empty string for empty input', () => {
    expect(uppercase('')).toBe('');
  });

  it('should preserve symbols and numbers', () => {
    expect(uppercase('hello123!')).toBe('HELLO123!');
  });
});

describe('wordCount', () => {
  it('should count words in basic text', () => {
    expect(wordCount('hello world')).toBe('2 words');
  });

  it('should handle single word', () => {
    expect(wordCount('hello')).toBe('1 word');
  });

  it('should return zero for empty input', () => {
    expect(wordCount('')).toBe('0 words');
  });

  it('should handle multiple spaces between words', () => {
    expect(wordCount('hello    world')).toBe('2 words');
  });

  it('should trim leading and trailing whitespace', () => {
    expect(wordCount('  hello world  ')).toBe('2 words');
  });
});

describe('transform', () => {
  it('should dispatch to slugify operation', () => {
    expect(transform('Hello World', 'slugify')).toBe('hello-world');
  });

  it('should dispatch to reverse operation', () => {
    expect(transform('hello', 'reverse')).toBe('olleh');
  });

  it('should dispatch to uppercase operation', () => {
    expect(transform('hello', 'uppercase')).toBe('HELLO');
  });

  it('should dispatch to wordCount operation', () => {
    expect(transform('hello world', 'wordCount')).toBe('2 words');
  });

  it('should throw error for unknown operation', () => {
    expect(() => transform('hello', 'unknown')).toThrow('Unknown operation: unknown');
  });
});
