import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import CodeEditor from '../../components/CodeEditor';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const CodeEditorPage = () => {
  const [selectedTab, setSelectedTab] = useState('editor');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const tabs = [
    { id: 'editor', label: 'Code Editor', icon: 'Code' },
    { id: 'templates', label: 'Templates', icon: 'FileText' },
    { id: 'snippets', label: 'Snippets', icon: 'Copy' },
    { id: 'settings', label: 'Settings', icon: 'Settings' }
  ];

  const templates = [
    {
      name: 'Hello World',
      languages: {
        javascript: 'console.log("Hello, World!");',
        python: 'print("Hello, World!")',
        java: 'public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
        cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}',
        c: '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}'
      }
    },
    {
      name: 'Sorting Algorithm',
      languages: {
        javascript: 'function bubbleSort(arr) {\n    let n = arr.length;\n    for (let i = 0; i < n-1; i++) {\n        for (let j = 0; j < n-i-1; j++) {\n            if (arr[j] > arr[j+1]) {\n                [arr[j], arr[j+1]] = [arr[j+1], arr[j]];\n            }\n        }\n    }\n    return arr;\n}\n\nconst numbers = [64, 34, 25, 12, 22, 11, 90];\nconsole.log("Sorted array:", bubbleSort(numbers));',
        python: 'def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n-1):\n        for j in range(0, n-i-1):\n            if arr[j] > arr[j+1]:\n                arr[j], arr[j+1] = arr[j+1], arr[j]\n    return arr\n\nnumbers = [64, 34, 25, 12, 22, 11, 90]\nprint("Sorted array:", bubble_sort(numbers))',
        java: 'public class BubbleSort {\n    public static void bubbleSort(int[] arr) {\n        int n = arr.length;\n        for (int i = 0; i < n-1; i++) {\n            for (int j = 0; j < n-i-1; j++) {\n                if (arr[j] > arr[j+1]) {\n                    int temp = arr[j];\n                    arr[j] = arr[j+1];\n                    arr[j+1] = temp;\n                }\n            }\n        }\n    }\n    \n    public static void main(String[] args) {\n        int[] numbers = {64, 34, 25, 12, 22, 11, 90};\n        bubbleSort(numbers);\n        System.out.print("Sorted array: ");\n        for (int num : numbers) {\n            System.out.print(num + " ");\n        }\n    }\n}',
        cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid bubbleSort(vector<int>& arr) {\n    int n = arr.size();\n    for (int i = 0; i < n-1; i++) {\n        for (int j = 0; j < n-i-1; j++) {\n            if (arr[j] > arr[j+1]) {\n                swap(arr[j], arr[j+1]);\n            }\n        }\n    }\n}\n\nint main() {\n    vector<int> numbers = {64, 34, 25, 12, 22, 11, 90};\n    bubbleSort(numbers);\n    cout << "Sorted array: ";\n    for (int num : numbers) {\n        cout << num << " ";\n    }\n    return 0;\n}',
        c: '#include <stdio.h>\n\nvoid bubbleSort(int arr[], int n) {\n    for (int i = 0; i < n-1; i++) {\n        for (int j = 0; j < n-i-1; j++) {\n            if (arr[j] > arr[j+1]) {\n                int temp = arr[j];\n                arr[j] = arr[j+1];\n                arr[j+1] = temp;\n            }\n        }\n    }\n}\n\nint main() {\n    int numbers[] = {64, 34, 25, 12, 22, 11, 90};\n    int n = sizeof(numbers) / sizeof(numbers[0]);\n    bubbleSort(numbers, n);\n    printf("Sorted array: ");\n    for (int i = 0; i < n; i++) {\n        printf("%d ", numbers[i]);\n    }\n    return 0;\n}'
      }
    },
    {
      name: 'Data Structures',
      languages: {
        javascript: 'class Stack {\n    constructor() {\n        this.items = [];\n    }\n    \n    push(element) {\n        this.items.push(element);\n    }\n    \n    pop() {\n        if (this.items.length === 0) return "Underflow";\n        return this.items.pop();\n    }\n    \n    peek() {\n        return this.items[this.items.length - 1];\n    }\n}\n\nconst stack = new Stack();\nstack.push(10);\nstack.push(20);\nconsole.log("Top element:", stack.peek());\nconsole.log("Popped:", stack.pop());',
        python: 'class Stack:\n    def __init__(self):\n        self.items = []\n    \n    def push(self, item):\n        self.items.append(item)\n    \n    def pop(self):\n        if self.is_empty():\n            return "Underflow"\n        return self.items.pop()\n    \n    def peek(self):\n        return self.items[-1]\n    \n    def is_empty(self):\n        return len(self.items) == 0\n\nstack = Stack()\nstack.push(10)\nstack.push(20)\nprint("Top element:", stack.peek())\nprint("Popped:", stack.pop())',
        java: 'import java.util.*;\n\npublic class Stack {\n    private List<Integer> items;\n    \n    public Stack() {\n        this.items = new ArrayList<>();\n    }\n    \n    public void push(int element) {\n        items.add(element);\n    }\n    \n    public int pop() {\n        if (items.isEmpty()) {\n            throw new RuntimeException("Underflow");\n        }\n        return items.remove(items.size() - 1);\n    }\n    \n    public int peek() {\n        return items.get(items.size() - 1);\n    }\n    \n    public static void main(String[] args) {\n        Stack stack = new Stack();\n        stack.push(10);\n        stack.push(20);\n        System.out.println("Top element: " + stack.peek());\n        System.out.println("Popped: " + stack.pop());\n    }\n}',
        cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Stack {\nprivate:\n    vector<int> items;\npublic:\n    void push(int element) {\n        items.push_back(element);\n    }\n    \n    int pop() {\n        if (items.empty()) {\n            throw runtime_error("Underflow");\n        }\n        int top = items.back();\n        items.pop_back();\n        return top;\n    }\n    \n    int peek() {\n        return items.back();\n    }\n};\n\nint main() {\n    Stack stack;\n    stack.push(10);\n    stack.push(20);\n    cout << "Top element: " << stack.peek() << endl;\n    cout << "Popped: " << stack.pop() << endl;\n    return 0;\n}',
        c: '#include <stdio.h>\n#include <stdlib.h>\n\n#define MAX_SIZE 100\n\nstruct Stack {\n    int items[MAX_SIZE];\n    int top;\n};\n\nvoid push(struct Stack* stack, int element) {\n    if (stack->top >= MAX_SIZE - 1) {\n        printf("Stack overflow\\n");\n        return;\n    }\n    stack->items[++stack->top] = element;\n}\n\nint pop(struct Stack* stack) {\n    if (stack->top < 0) {\n        printf("Stack underflow\\n");\n        return -1;\n    }\n    return stack->items[stack->top--];\n}\n\nint peek(struct Stack* stack) {\n    return stack->items[stack->top];\n}\n\nint main() {\n    struct Stack stack = {{0}, -1};\n    push(&stack, 10);\n    push(&stack, 20);\n    printf("Top element: %d\\n", peek(&stack));\n    printf("Popped: %d\\n", pop(&stack));\n    return 0;\n}'
      }
    }
  ];

  const snippets = [
    { name: 'Quick Sort', language: 'javascript', code: 'function quickSort(arr) {\n    if (arr.length <= 1) return arr;\n    const pivot = arr[Math.floor(arr.length / 2)];\n    const left = arr.filter(x => x < pivot);\n    const middle = arr.filter(x => x === pivot);\n    const right = arr.filter(x => x > pivot);\n    return [...quickSort(left), ...middle, ...quickSort(right)];\n}' },
    { name: 'Binary Search', language: 'python', code: 'def binary_search(arr, target):\n    left, right = 0, len(arr) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1' },
    { name: 'Linked List', language: 'java', code: 'class ListNode {\n    int val;\n    ListNode next;\n    ListNode(int x) { val = x; }\n}\n\nclass LinkedList {\n    ListNode head;\n    \n    public void add(int val) {\n        ListNode newNode = new ListNode(val);\n        newNode.next = head;\n        head = newNode;\n    }\n}' }
  ];

  const renderTemplates = () => (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-foreground">Code Templates</h3>
          <p className="text-muted-foreground">Pre-built examples for quick start</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" iconName="Search">
            Search
          </Button>
          <Button variant="outline" size="sm" iconName="Filter">
            Filter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template, index) => (
          <div key={index} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-200 hover:transform hover:scale-105 group">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                <Icon name="FileText" size={24} color="white" />
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Star" size={16} color="var(--color-warning)" />
                <span className="text-sm text-muted-foreground">Popular</span>
              </div>
            </div>
            
            <h4 className="text-lg font-semibold text-foreground mb-2">{template.name}</h4>
            <p className="text-sm text-muted-foreground mb-4">Available in all supported languages with syntax highlighting</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {Object.keys(template.languages).map((lang) => (
                <span key={lang} className="text-xs px-3 py-1 bg-muted rounded-full text-muted-foreground font-medium">
                  {lang}
                </span>
              ))}
            </div>
            
            <Button variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <Icon name="Eye" size={16} className="mr-2" />
              View Template
            </Button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSnippets = () => (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-foreground">Code Snippets</h3>
          <p className="text-muted-foreground">Common algorithms and data structures</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" iconName="Plus">
            Add Snippet
          </Button>
          <Button variant="outline" size="sm" iconName="Bookmark">
            My Snippets
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {snippets.map((snippet, index) => (
          <div key={index} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Icon name="Copy" size={20} color="white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-foreground">{snippet.name}</h4>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground font-medium">
                      {snippet.language}
                    </span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">Algorithm</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" iconName="Copy" className="h-8 w-8 p-0">
                </Button>
                <Button variant="ghost" size="sm" iconName="Heart" className="h-8 w-8 p-0">
                </Button>
                <Button variant="ghost" size="sm" iconName="MoreVertical" className="h-8 w-8 p-0">
                </Button>
              </div>
            </div>
            
            <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
              <pre className="text-sm text-foreground font-mono overflow-x-auto leading-relaxed">
                {snippet.code}
              </pre>
            </div>
            
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="Eye" size={12} />
                  <span>1.2k views</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Heart" size={12} />
                  <span>89 likes</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Copy" size={12} />
                  <span>234 copies</span>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Icon name="Copy" size={14} className="mr-2" />
                Copy Code
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Editor Settings</h3>
      <div className="space-y-6">
        <div className="bg-card border border-border rounded-lg p-4">
          <h4 className="font-medium text-foreground mb-3">Appearance</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Theme</span>
              <select className="px-3 py-1 bg-muted border border-border rounded-md text-sm">
                <option>Dark</option>
                <option>Light</option>
                <option>Auto</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Font Size</span>
              <input type="range" min="10" max="24" defaultValue="14" className="w-20" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <h4 className="font-medium text-foreground mb-3">Compilation</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Auto-save</span>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Syntax Highlighting</span>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Code Editor - Moodify</title>
        <meta name="description" content="Advanced code editor with multi-language support" />
      </Helmet>

      <Header />

      <div className={`flex h-[calc(100vh-4rem)] ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
        {/* Enhanced Sidebar */}
        <div className={`${isFullscreen ? 'w-80' : 'w-64'} bg-card border-r border-border flex flex-col transition-all duration-300`}>
          {/* Sidebar Header */}
          <div className="p-6 border-b border-border bg-gradient-to-r from-primary/5 to-secondary/5">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                <Icon name="Code" size={24} color="white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">Code Editor</h2>
                <p className="text-sm text-muted-foreground">Development Environment</p>
              </div>
            </div>
          </div>

          {/* Enhanced Navigation Tabs */}
          <div className="flex-1 p-4">
            <nav className="space-y-3">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    selectedTab === tab.id
                      ? 'bg-primary text-primary-foreground shadow-lg transform scale-105'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground hover:transform hover:scale-102'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    selectedTab === tab.id ? 'bg-primary-foreground/20' : 'bg-muted'
                  }`}>
                    <Icon name={tab.icon} size={18} />
                  </div>
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Enhanced Action Panel */}
          <div className="p-4 border-t border-border space-y-3">
            <Button
              variant={isFullscreen ? "default" : "outline"}
              size="sm"
              onClick={() => setIsFullscreen(!isFullscreen)}
              iconName={isFullscreen ? "Minimize" : "Maximize"}
              className="w-full"
            >
              {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            </Button>
            
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                iconName="Save"
                className="text-xs"
              >
                Save
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="FolderOpen"
                className="text-xs"
              >
                Open
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Main Content */}
        <div className="flex-1 flex flex-col bg-background">
          {/* Content Header */}
          <div className="bg-card border-b border-border p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Icon name={tabs.find(tab => tab.id === selectedTab)?.icon || 'Code'} size={16} color="white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {tabs.find(tab => tab.id === selectedTab)?.label || 'Editor'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedTab === 'editor' && 'Write and execute code in multiple languages'}
                    {selectedTab === 'templates' && 'Pre-built code templates and examples'}
                    {selectedTab === 'snippets' && 'Common code snippets and algorithms'}
                    {selectedTab === 'settings' && 'Customize your development environment'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Icon name="Clock" size={12} />
                  <span>Auto-save enabled</span>
                </div>
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-hidden">
            {selectedTab === 'editor' ? (
              <CodeEditor />
            ) : selectedTab === 'templates' ? (
              <div className="h-full overflow-auto">
                {renderTemplates()}
              </div>
            ) : selectedTab === 'snippets' ? (
              <div className="h-full overflow-auto">
                {renderSnippets()}
              </div>
            ) : selectedTab === 'settings' ? (
              <div className="h-full overflow-auto">
                {renderSettings()}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditorPage;
