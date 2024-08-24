#include <stdio.h>
#include <limits.h>
#include <math.h>
#include <stdint.h>

#ifdef _WIN32
#define EXPORT __declspec(dllexport)
#else
#define EXPORT
#endif

EXPORT int max() {
    // Usando a função pow() da biblioteca math.h
    // return (int)pow(2, 8 * sizeof(int)) - 1;

    // Fazendo um deslocamento de bits
    return (int)((1U << (8 * sizeof(int) - 1)) - 1);
}
