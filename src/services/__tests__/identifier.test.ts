import { describe, it, expect } from 'vitest';
import { generateDeterministicId } from '../identifier';

describe('Identifier Service', () => {
  it('generates IDs with correct format and prefix', () => {
    const id = generateDeterministicId('cl');
    expect(id).toMatch(/^CL-\d{8}-\d{3}$/);
  });

  it('generates sequential and unique IDs for the same prefix', () => {
    const id1 = generateDeterministicId('job');
    const id2 = generateDeterministicId('job');
    
    expect(id1).not.toBe(id2);
    
    const seq1 = parseInt(id1.split('-')[2] || '0', 10);
    const seq2 = parseInt(id2.split('-')[2] || '0', 10);
    expect(seq2).toBe(seq1 + 1);
  });
});
