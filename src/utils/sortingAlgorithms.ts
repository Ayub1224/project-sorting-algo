export const generateRandomArray = (size: number): number[] => {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
};

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const bubbleSort = async (
  numbers: number[],
  updateNumbers: React.Dispatch<React.SetStateAction<number[]>>
): Promise<number[]> => {
  const nums = [...numbers];
  const len = nums.length;

  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (nums[j] > nums[j + 1]) {
        [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]];
        updateNumbers([...nums]);
        await wait(100);
      }
    }
  }
  return nums;
};

export const quickSort = async (
  numbers: number[],
  updateNumbers: React.Dispatch<React.SetStateAction<number[]>>
): Promise<number[]> => {
  const nums = [...numbers];

  const partition = async (start: number, end: number): Promise<number> => {
    const pivot = nums[end];
    let i = start - 1;

    for (let j = start; j < end; j++) {
      if (nums[j] < pivot) {
        i++;
        [nums[i], nums[j]] = [nums[j], nums[i]];
        updateNumbers([...nums]);
        await wait(100);
      }
    }
    [nums[i + 1], nums[end]] = [nums[end], nums[i + 1]];
    updateNumbers([...nums]);
    await wait(100);
    return i + 1;
  };

  const sort = async (start: number, end: number): Promise<void> => {
    if (start < end) {
      const pivotIndex = await partition(start, end);
      await sort(start, pivotIndex - 1);
      await sort(pivotIndex + 1, end);
    }
  };

  await sort(0, nums.length - 1);
  return nums;
};

export const mergeSort = async (
  numbers: number[],
  updateNumbers: React.Dispatch<React.SetStateAction<number[]>>
): Promise<number[]> => {
  const nums = [...numbers];

  const merge = async (start: number, mid: number, end: number): Promise<void> => {
    const leftSize = mid - start + 1;
    const rightSize = end - mid;
    const leftHalf = nums.slice(start, mid + 1);
    const rightHalf = nums.slice(mid + 1, end + 1);

    let i = 0, j = 0, k = start;

    while (i < leftSize && j < rightSize) {
      if (leftHalf[i] <= rightHalf[j]) {
        nums[k] = leftHalf[i];
        i++;
      } else {
        nums[k] = rightHalf[j];
        j++;
      }
      updateNumbers([...nums]);
      await wait(100);
      k++;
    }

    while (i < leftSize) {
      nums[k] = leftHalf[i];
      updateNumbers([...nums]);
      await wait(100);
      i++;
      k++;
    }

    while (j < rightSize) {
      nums[k] = rightHalf[j];
      updateNumbers([...nums]);
      await wait(100);
      j++;
      k++;
    }
  };

  const sort = async (start: number, end: number): Promise<void> => {
    if (start < end) {
      const mid = Math.floor((start + end) / 2);
      await sort(start, mid);
      await sort(mid + 1, end);
      await merge(start, mid, end);
    }
  };

  await sort(0, nums.length - 1);
  return nums;
};

export const selectionSort = async (
  numbers: number[],
  updateNumbers: React.Dispatch<React.SetStateAction<number[]>>
): Promise<number[]> => {
  const nums = [...numbers];
  const len = nums.length;

  for (let i = 0; i < len - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < len; j++) {
      if (nums[j] < nums[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      [nums[i], nums[minIndex]] = [nums[minIndex], nums[i]];
      updateNumbers([...nums]);
      await wait(100);
    }
  }
  return nums;
};

export const insertionSort = async (
  numbers: number[],
  updateNumbers: React.Dispatch<React.SetStateAction<number[]>>
): Promise<number[]> => {
  const nums = [...numbers];
  const len = nums.length;

  for (let i = 1; i < len; i++) {
    const current = nums[i];
    let j = i - 1;

    while (j >= 0 && nums[j] > current) {
      nums[j + 1] = nums[j];
      updateNumbers([...nums]);
      await wait(100);
      j--;
    }
    nums[j + 1] = current;
    updateNumbers([...nums]);
    await wait(100);
  }
  return nums;
};

export const heapSort = async (
  numbers: number[],
  updateNumbers: React.Dispatch<React.SetStateAction<number[]>>
): Promise<number[]> => {
  const nums = [...numbers];
  const len = nums.length;

  const heapify = async (size: number, root: number): Promise<void> => {
    let largest = root;
    const left = 2 * root + 1;
    const right = 2 * root + 2;

    if (left < size && nums[left] > nums[largest]) {
      largest = left;
    }

    if (right < size && nums[right] > nums[largest]) {
      largest = right;
    }

    if (largest !== root) {
      [nums[root], nums[largest]] = [nums[largest], nums[root]];
      updateNumbers([...nums]);
      await wait(100);
      await heapify(size, largest);
    }
  };

  for (let i = Math.floor(len / 2) - 1; i >= 0; i--) {
    await heapify(len, i);
  }

  for (let i = len - 1; i > 0; i--) {
    [nums[0], nums[i]] = [nums[i], nums[0]];
    updateNumbers([...nums]);
    await wait(100);
    await heapify(i, 0);
  }

  return nums;
};

export const countingSort = async (
  numbers: number[],
  updateNumbers: React.Dispatch<React.SetStateAction<number[]>>
): Promise<number[]> => {
  const nums = [...numbers];
  const len = nums.length;
  const max = Math.max(...nums);
  const counts = new Array(max + 1).fill(0);
  const result = new Array(len);

  for (let i = 0; i < len; i++) {
    counts[nums[i]]++;
  }

  for (let i = 1; i <= max; i++) {
    counts[i] += counts[i - 1];
  }

  for (let i = len - 1; i >= 0; i--) {
    result[counts[nums[i]] - 1] = nums[i];
    counts[nums[i]]--;
    updateNumbers([...result]);
    await wait(100);
  }

  return result;
};

export const radixSort = async (
  numbers: number[],
  updateNumbers: React.Dispatch<React.SetStateAction<number[]>>
): Promise<number[]> => {
  const nums = [...numbers];
  const max = Math.max(...nums);
  let exp = 1;

  const sortByDigit = async (exp: number): Promise<void> => {
    const len = nums.length;
    const result = new Array(len);
    const counts = new Array(10).fill(0);

    for (let i = 0; i < len; i++) {
      counts[Math.floor(nums[i] / exp) % 10]++;
    }

    for (let i = 1; i < 10; i++) {
      counts[i] += counts[i - 1];
    }

    for (let i = len - 1; i >= 0; i--) {
      const digit = Math.floor(nums[i] / exp) % 10;
      result[counts[digit] - 1] = nums[i];
      counts[digit]--;
    }

    for (let i = 0; i < len; i++) {
      nums[i] = result[i];
      updateNumbers([...nums]);
      await wait(100);
    }
  };

  while (Math.floor(max / exp) > 0) {
    await sortByDigit(exp);
    exp *= 10;
  }

  return nums;
}; 