import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import SortingVisualizer from './components/SortingVisualizer';
function App() {
    return (_jsxs("div", { className: "min-h-screen bg-gray-100", children: [_jsx("header", { className: "bg-white shadow", children: _jsx("div", { className: "max-w-7xl mx-auto py-6 px-4", children: _jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "Sorting Algorithm Visualizer" }) }) }), _jsx("main", { children: _jsx("div", { className: "max-w-10xl mx-auto py-6 sm:px-6 lg:px-8", children: _jsx(SortingVisualizer, {}) }) })] }));
}
export default App;
