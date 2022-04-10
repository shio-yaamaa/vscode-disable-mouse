// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { Timer } from './timer';

let previousTextEditor: vscode.TextEditor | null = null;
let previousSelections: vscode.Selection[] = [];

const timer = new Timer(1000);

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  vscode.window.onDidChangeTextEditorSelection((event) => {
    const isAllowed = isSelectionChangeEventAllowed(
      event,
      previousTextEditor,
      timer
    );

    if (isAllowed) {
      previousTextEditor = event.textEditor;
      previousSelections = event.selections.map((selection) => selection);
    } else {
      event.textEditor.selections = previousSelections;
    }
  });

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    'disable-mouse.enable-mouse',
    () => {
      timer.set(3000);
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}

const isSelectionChangeEventAllowed = (
  event: vscode.TextEditorSelectionChangeEvent,
  previousTextEditor: vscode.TextEditor | null,
  timer: Timer
): boolean => {
  const isMouse = event.kind === vscode.TextEditorSelectionChangeKind.Mouse;
  const isSameTextEditor = event.textEditor === previousTextEditor;
  return !isMouse || !isSameTextEditor || !timer.hasEnded;
};
