#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_LENGTH 11
#define MAX_WORD_LENGTH 201

void removePrimeiraLetra(char *str) {
  memmove(str, str + 1, strlen(str));
}

void percorre(char subword[MAX_LENGTH + 1], int num_inputs, int results[]) {
  int k;
  for (k = 0; k < num_inputs; k++) {
    char input[MAX_WORD_LENGTH];
    scanf("%s", input);

    int i, j;
    int input_len = strlen(input);
    int subword_len = strlen(subword);

    int found = 0;
    for (i = 0; i <= input_len - subword_len; i++) {
      int match = 1;
      for (j = 0; j < subword_len; j++) {
        if (input[i + j] != subword[j]) {
          match = 0;
          break;
        }
      }
      if (match) {
        found = 1;
        break;
      }
    }

    results[k] = found;
  }
}

void constroi(char subword[MAX_LENGTH + 1]) {
  int subword_len = strlen(subword);

  char V1[MAX_LENGTH + 1][MAX_WORD_LENGTH + 1];
  char V2[MAX_LENGTH + 1][MAX_WORD_LENGTH + 1];
  char V3[MAX_LENGTH + 1][MAX_WORD_LENGTH + 1];

  int i, z;

  for (i = 0; i <= subword_len; i++) {
    if (i == 0) {
      strcpy(V1[i], "eps");
    } else {
      strncpy(V1[i], subword, i);
      V1[i][i] = '\0';
    }
  }

  for (z = 0; z <= subword_len; z++) {
    char palavraConcatenada[MAX_WORD_LENGTH];

    if (strcmp(V1[z], "eps") == 0) {
      strcpy(palavraConcatenada, "a");
    } else {
      strcpy(palavraConcatenada, V1[z]);
      strcat(palavraConcatenada, "a");
    }

    int isFounded = 0;

    for (i = 0; i <= subword_len; i++) {
      if (strcmp(palavraConcatenada, V1[i]) == 0) {
        strcpy(V2[z], palavraConcatenada);
        break;
      }
    }

    if (i > subword_len) {
      int isRemovedLetterFound = 0;
      int tamanhoPalavraConcatenada = strlen(palavraConcatenada);

      while (tamanhoPalavraConcatenada != 0) {
        removePrimeiraLetra(palavraConcatenada);
        for (i = 0; i <= subword_len; i++) {
          if (strcmp(palavraConcatenada, V1[i]) == 0) {
            strcpy(V2[z], palavraConcatenada);
            isRemovedLetterFound = 1;
            break;
          }
        }
        if (isRemovedLetterFound == 1)
          break;

        tamanhoPalavraConcatenada--;
      }

      if (isRemovedLetterFound == 0) {
        strcpy(V2[z], "eps");
      }
    }
  }

  for (z = 0; z <= subword_len; z++) {
    char palavraConcatenada[MAX_WORD_LENGTH];

    if (strcmp(V1[z], "eps") == 0) {
      strcpy(palavraConcatenada, "b");
    } else {
      strcpy(palavraConcatenada, V1[z]);
      strcat(palavraConcatenada, "b");
    }

    int isFounded = 0;

    for (i = 0; i <= subword_len; i++) {
      if (strcmp(palavraConcatenada, V1[i]) == 0) {
        strcpy(V3[z], palavraConcatenada);
        break;
      }
    }

    if (i > subword_len) {
      int isRemovedLetterFound = 0;
      int tamanhoPalavraConcatenada = strlen(palavraConcatenada);

      while (tamanhoPalavraConcatenada != 0) {
        removePrimeiraLetra(palavraConcatenada);
        for (i = 0; i <= subword_len; i++) {
          if (strcmp(palavraConcatenada, V1[i]) == 0) {
            strcpy(V3[z], palavraConcatenada);
            isRemovedLetterFound = 1;
            break;
          }
        }
        if (isRemovedLetterFound == 1)
          break;

        tamanhoPalavraConcatenada--;
      }

      if (isRemovedLetterFound == 0) {
        strcpy(V3[z], "eps");
      }
    }
  }

  strcpy(V2[subword_len], subword);
  strcpy(V3[subword_len], subword);

  for (i = 0; i <= subword_len; i++) {
    printf("%s %s %s\n", V1[i], V2[i], V3[i]);
  }
}

int main() {
  char subword[MAX_LENGTH + 1];
  int num_inputs;
  scanf("%s", subword);
  scanf("%d", &num_inputs);
  int *results = (int *)malloc(num_inputs * sizeof(int));

  percorre(subword, num_inputs, results);

  constroi(subword);

  int i;
  for (i = 0; i < num_inputs; i++) {
    printf("%d\n", results[i]);
  }

  free(results);

  return 0;
}
