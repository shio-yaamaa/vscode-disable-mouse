import { workspace } from 'vscode';

const root = workspace.getConfiguration('disableMouse');

export const config = {
  enableMouseTimeLimit: root.get<number>('enableMouseTimeLimit') ?? 5,
};
