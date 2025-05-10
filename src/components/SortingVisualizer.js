import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import Select from 'react-select';
import { generateRandomArray, bubbleSort, quickSort, mergeSort, selectionSort, insertionSort, heapSort, countingSort, radixSort } from '../utils/sortingAlgorithms';
// Available sorting methods with their details
const sortMethods = [
    {
        id: 'bubble',
        name: 'Bubble Sort',
        howItWorks: 'Imagine bubbles rising in water - that\'s how this algorithm works! It compares two numbers side by side and swaps them if they\'re in the wrong order. It keeps doing this until all numbers are in the right place. Like bubbles, smaller numbers "float" to the top.',
        performance: 'Time Complexity: O(n²) - Works well for small lists but slower for large ones'
    },
    {
        id: 'selection',
        name: 'Selection Sort',
        howItWorks: 'Think of it like sorting cards in your hand. You scan through all cards to find the smallest one, put it at the start, then repeat with the remaining cards. It\'s like building a sorted pile one card at a time.',
        performance: 'Time Complexity: O(n²) - Simple but not the fastest for large lists'
    },
    {
        id: 'insertion',
        name: 'Insertion Sort',
        howItWorks: 'Similar to how you sort playing cards in your hand. You pick up one card and insert it into its correct position among the cards you\'re already holding. It\'s efficient for small lists and nearly sorted data.',
        performance: 'Time Complexity: O(n²) - Great for small lists or when data is almost sorted'
    },
    {
        id: 'merge',
        name: 'Merge Sort',
        howItWorks: 'This algorithm works like sorting a deck of cards by splitting it into two piles, sorting each pile, and then merging them back together. It\'s very efficient and always performs the same way, regardless of how the numbers are arranged.',
        performance: 'Time Complexity: O(n log n) - Consistently fast for all types of data'
    },
    {
        id: 'quick',
        name: 'Quick Sort',
        howItWorks: 'Like organizing a classroom by height. You pick a "pivot" student, then have everyone shorter stand on one side and taller on the other. Then you do the same for each side. It\'s usually the fastest in practice.',
        performance: 'Time Complexity: O(n log n) average case - One of the fastest sorting algorithms'
    },
    {
        id: 'heap',
        name: 'Heap Sort',
        howItWorks: 'Imagine building a pyramid where each parent is larger than its children. This algorithm first builds such a structure, then repeatedly takes the largest element from the top and rebuilds the pyramid. It\'s efficient and uses less extra space than some other algorithms.',
        performance: 'Time Complexity: O(n log n) - Good balance of speed and memory usage'
    },
    {
        id: 'counting',
        name: 'Counting Sort',
        howItWorks: 'Perfect for sorting numbers within a small range. It works like counting how many of each number you have, then placing them in order. It\'s super fast when you know all numbers are within a small range (like 1 to 100).',
        performance: 'Time Complexity: O(n + k) - Extremely fast when numbers are in a small range'
    },
    {
        id: 'radix',
        name: 'Radix Sort',
        howItWorks: 'Like sorting numbers by looking at one digit at a time, starting from the rightmost digit. It\'s similar to how you might sort a stack of papers by looking at the last digit of page numbers first, then the second-to-last, and so on.',
        performance: 'Time Complexity: O(d(n + k)) - Great for numbers with many digits'
    },
];
// Custom styles for the select component
const selectTheme = {
    control: (base, state) => ({
        ...base,
        minWidth: '100%',
        background: '#fff',
        borderColor: state.isFocused ? '#4b5563' : '#e5e7eb',
        boxShadow: state.isFocused ? '0 0 0 1px #4b5563' : 'none',
        '&:hover': {
            borderColor: '#6b7280'
        },
        '@media (min-width: 640px)': {
            minWidth: '200px'
        }
    }),
    option: (base, state) => ({
        ...base,
        backgroundColor: state.isSelected ? '#4b5563' : state.isFocused ? '#f3f4f6' : '#fff',
        color: state.isSelected ? '#fff' : '#000',
        '&:hover': {
            backgroundColor: state.isSelected ? '#4b5563' : '#f3f4f6'
        }
    })
};
const SortingVisualizer = () => {
    // State management
    const [size, setSize] = useState(10);
    const [currentMethod, setCurrentMethod] = useState(sortMethods[0]);
    const [numbers, setNumbers] = useState([]);
    const [isRunning, setIsRunning] = useState(false);
    const [barColors, setBarColors] = useState([]);
    // Generate new random colors for bars
    const getRandomColor = () => {
        const hue = Math.floor(Math.random() * 360);
        return `hsl(${hue}, 70%, 60%)`;
    };
    // Initialize or update array when size changes
    useEffect(() => {
        createNewArray();
    }, [size]);
    // Create new random array
    const createNewArray = () => {
        const newArray = generateRandomArray(size);
        setNumbers(newArray);
        setBarColors(newArray.map(() => getRandomColor()));
    };
    // Start the sorting process
    const runSorting = async () => {
        setIsRunning(true);
        let result = [...numbers];
        try {
            switch (currentMethod.id) {
                case 'bubble':
                    result = await bubbleSort([...numbers], setNumbers);
                    break;
                case 'selection':
                    result = await selectionSort([...numbers], setNumbers);
                    break;
                case 'insertion':
                    result = await insertionSort([...numbers], setNumbers);
                    break;
                case 'merge':
                    result = await mergeSort([...numbers], setNumbers);
                    break;
                case 'quick':
                    result = await quickSort([...numbers], setNumbers);
                    break;
                case 'heap':
                    result = await heapSort([...numbers], setNumbers);
                    break;
                case 'counting':
                    result = await countingSort([...numbers], setNumbers);
                    break;
                case 'radix':
                    result = await radixSort([...numbers], setNumbers);
                    break;
                default:
                    console.warn('Unknown sorting method:', currentMethod.id);
            }
        }
        catch (error) {
            console.error('Sorting error:', error);
        }
        finally {
            setNumbers(result);
            setIsRunning(false);
        }
    };
    // Chart configuration
    const getChartConfig = () => ({
        xAxis: {
            type: 'category',
            data: Array.from({ length: numbers.length }, (_, i) => i + 1),
        },
        yAxis: {
            type: 'value',
            max: 100,
        },
        series: [
            {
                data: numbers.map((value, index) => ({
                    value: value,
                    itemStyle: {
                        color: barColors[index]
                    }
                })),
                type: 'bar',
                label: {
                    show: true,
                    position: 'top',
                    formatter: '{c}',
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: '#000'
                }
            },
        ],
        animation: false,
    });
    return (_jsxs("div", { className: "p-4 sm:p-8", children: [_jsxs("div", { className: "mb-6 space-y-4", children: [_jsxs("div", { className: "flex flex-col sm:flex-row gap-4 items-start sm:items-center", children: [_jsx("div", { className: "w-full sm:w-auto", children: _jsx(Select, { value: currentMethod, onChange: (option) => setCurrentMethod(option), options: sortMethods, styles: selectTheme, isDisabled: isRunning, placeholder: "Pick a sorting method", getOptionLabel: (option) => option.name, getOptionValue: (option) => option.id }) }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-2 w-full sm:w-auto", children: [_jsx("button", { onClick: createNewArray, className: "w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50", disabled: isRunning, children: "New Array" }), _jsx("button", { onClick: runSorting, className: "w-full sm:w-auto px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50", disabled: isRunning, children: isRunning ? 'Sorting...' : 'Start' })] })] }), _jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center gap-4", children: [_jsxs("label", { className: "text-sm font-medium text-gray-700 whitespace-nowrap", children: ["Size: ", size] }), _jsx("input", { type: "range", min: "10", max: "90", value: size, onChange: (e) => setSize(parseInt(e.target.value)), className: "w-full sm:w-64 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer", disabled: isRunning })] }), _jsxs("div", { className: "mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-800 mb-2", children: currentMethod.name }), _jsx("p", { className: "text-gray-600 mb-2 text-sm sm:text-base", children: sortMethods.find(method => method.id === currentMethod.id)?.howItWorks }), _jsx("p", { className: "text-xs sm:text-sm text-gray-500", children: sortMethods.find(method => method.id === currentMethod.id)?.performance })] })] }), _jsx("div", { className: "w-full h-[300px] sm:h-[400px] md:h-[500px]", children: _jsx(ReactECharts, { option: getChartConfig(), style: { height: '100%', width: '100%' }, opts: { renderer: 'svg' } }) })] }));
};
export default SortingVisualizer;
