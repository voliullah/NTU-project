export function generateWord(): string {
    const vowels: string[] = ['a', 'e', 'i', 'o', 'u'];
    const consonants: string[] = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'];
  
    let word = '';
  
    // Generate the first three letters (consonant-vowel-consonant pattern)
    for (let i = 0; i < 3; i++) {
      const consonant = consonants[Math.floor(Math.random() * consonants.length)];
      const vowel = vowels[Math.floor(Math.random() * vowels.length)];
      word += consonant + vowel;
    }
  
    // Generate the last two letters (vowel-consonant pattern)
    const vowel = vowels[Math.floor(Math.random() * vowels.length)];
    const consonant = consonants[Math.floor(Math.random() * consonants.length)];
    word += vowel + consonant;
  
    return word;
    
  }
  