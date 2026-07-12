import { EditorView } from 'codemirror'
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language'
import { tags } from '@lezer/highlight'

export const highlightCodeQuest = syntaxHighlighting(HighlightStyle.define([
    { tag: tags.keyword, color: '#c084fc', fontWeight: 'bold' },
    { tag: tags.controlKeyword, color: '#c084fc', fontWeight: 'bold' },
    { tag: tags.string, color: '#86efac' },
    { tag: tags.number, color: '#fbbf24' },
    { tag: tags.bool, color: '#fbbf24' },
    { tag: tags.null, color: '#fbbf24' },
    { tag: tags.comment, color: 'rgba(255, 255, 255, 0.4)', fontStyle: 'italic' },
    { tag: tags.variableName, color: '#7dd3fc' },
    { tag: tags.function(tags.variableName), color: '#60a5fa' },
    { tag: tags.propertyName, color: '#67e8f9' },
    { tag: tags.typeName, color: '#f472b6' },
    { tag: tags.operator, color: '#f87171' },
    { tag: tags.punctuation, color: 'rgba(255, 255, 255, 0.55)' },
    { tag: tags.definition(tags.variableName), color: '#e2e8f0', fontWeight: 'bold' },
]))

export const themeCodeQuest = EditorView.theme({
    '&': {
        backgroundColor: '#050d1a',
        color: 'rgba(255, 255, 255, 0.85)',
        border: '1px solid rgba(124, 58, 237, 0.3)',
        borderRadius: '12px',
        overflow: 'hidden',
    },
    '&.cm-focused': {
        outline: 'none',
        borderColor: 'rgba(124, 58, 237, 0.6)',
        boxShadow: '0 0 20px rgba(124, 58, 237, 0.15)',
    },
    '.cm-content': {
        caretColor: '#00d4ff',
        fontFamily: "'Courier New', monospace",
        fontSize: '13.5px',
    },
    '.cm-cursor': {
        borderLeftColor: '#00d4ff',
    },
    '.cm-selectionBackground, &.cm-focused .cm-selectionBackground': {
        backgroundColor: 'rgba(124, 58, 237, 0.35) !important',
    },
    '.cm-gutters': {
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
        color: 'rgba(255, 255, 255, 0.25)',
        border: 'none',
        borderRight: '1px solid rgba(255, 255, 255, 0.06)',
    },
    '.cm-activeLine': {
        backgroundColor: 'rgba(124, 58, 237, 0.06)',
    },
    '.cm-activeLineGutter': {
        backgroundColor: 'rgba(124, 58, 237, 0.1)',
        color: '#a78bfa',
    },
}, { dark: true })

export const themeDark = EditorView.theme({
    '&': {
        backgroundColor: '#1e1e1e',
        color: '#d4d4d4',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        overflow: 'hidden',
    },
    '&.cm-focused': {
        outline: 'none',
        borderColor: 'rgba(255, 255, 255, 0.25)',
    },
    '.cm-content': {
        caretColor: '#ffffff',
        fontFamily: "'Courier New', monospace",
        fontSize: '13.5px',
    },
    '.cm-cursor': {
        borderLeftColor: '#ffffff',
    },
    '.cm-selectionBackground, &.cm-focused .cm-selectionBackground': {
        backgroundColor: 'rgba(255, 255, 255, 0.2) !important',
    },
    '.cm-gutters': {
        backgroundColor: '#1e1e1e',
        color: 'rgba(255, 255, 255, 0.3)',
        border: 'none',
        borderRight: '1px solid rgba(255, 255, 255, 0.08)',
    },
    '.cm-activeLine': {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
    },
    '.cm-activeLineGutter': {
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        color: '#ffffff',
    },
}, { dark: true })

export const themeLight = EditorView.theme({
    '&': {
        backgroundColor: '#ffffff',
        color: '#1a1a1a',
        border: '1px solid rgba(0, 0, 0, 0.15)',
        borderRadius: '12px',
        overflow: 'hidden',
    },
    '&.cm-focused': {
        outline: 'none',
        borderColor: 'rgba(124, 58, 237, 0.5)',
        boxShadow: '0 0 12px rgba(124, 58, 237, 0.1)',
    },
    '.cm-content': {
        caretColor: '#7c3aed',
        fontFamily: "'Courier New', monospace",
        fontSize: '13.5px',
    },
    '.cm-cursor': {
        borderLeftColor: '#7c3aed',
    },
    '.cm-selectionBackground, &.cm-focused .cm-selectionBackground': {
        backgroundColor: 'rgba(124, 58, 237, 0.18) !important',
    },
    '.cm-gutters': {
        backgroundColor: '#f5f5f5',
        color: 'rgba(0, 0, 0, 0.35)',
        border: 'none',
        borderRight: '1px solid rgba(0, 0, 0, 0.08)',
    },
    '.cm-activeLine': {
        backgroundColor: 'rgba(124, 58, 237, 0.05)',
    },
    '.cm-activeLineGutter': {
        backgroundColor: 'rgba(124, 58, 237, 0.08)',
        color: '#7c3aed',
    },
}, { dark: false })

export const themeOcean = EditorView.theme({
    '&': {
        backgroundColor: '#021a2e',
        color: 'rgba(224, 247, 255, 0.9)',
        border: '1px solid rgba(0, 212, 255, 0.3)',
        borderRadius: '12px',
        overflow: 'hidden',
    },
    '&.cm-focused': {
        outline: 'none',
        borderColor: 'rgba(0, 212, 255, 0.6)',
        boxShadow: '0 0 20px rgba(0, 212, 255, 0.15)',
    },
    '.cm-content': {
        caretColor: '#34d399',
        fontFamily: "'Courier New', monospace",
        fontSize: '13.5px',
    },
    '.cm-cursor': {
        borderLeftColor: '#34d399',
    },
    '.cm-selectionBackground, &.cm-focused .cm-selectionBackground': {
        backgroundColor: 'rgba(0, 212, 255, 0.25) !important',
    },
    '.cm-gutters': {
        backgroundColor: 'rgba(0, 212, 255, 0.03)',
        color: 'rgba(224, 247, 255, 0.3)',
        border: 'none',
        borderRight: '1px solid rgba(0, 212, 255, 0.1)',
    },
    '.cm-activeLine': {
        backgroundColor: 'rgba(0, 212, 255, 0.07)',
    },
    '.cm-activeLineGutter': {
        backgroundColor: 'rgba(0, 212, 255, 0.12)',
        color: '#34d399',
    },
}, { dark: true })

export const themeMatrix = EditorView.theme({
    '&': {
        backgroundColor: '#000c00',
        color: 'rgba(180, 255, 180, 0.9)',
        border: '1px solid rgba(34, 197, 94, 0.35)',
        borderRadius: '12px',
        overflow: 'hidden',
    },
    '&.cm-focused': {
        outline: 'none',
        borderColor: 'rgba(34, 197, 94, 0.7)',
        boxShadow: '0 0 20px rgba(34, 197, 94, 0.2)',
    },
    '.cm-content': {
        caretColor: '#22c55e',
        fontFamily: "'Courier New', monospace",
        fontSize: '13.5px',
    },
    '.cm-cursor': {
        borderLeftColor: '#22c55e',
    },
    '.cm-selectionBackground, &.cm-focused .cm-selectionBackground': {
        backgroundColor: 'rgba(34, 197, 94, 0.3) !important',
    },
    '.cm-gutters': {
        backgroundColor: 'rgba(34, 197, 94, 0.03)',
        color: 'rgba(180, 255, 180, 0.3)',
        border: 'none',
        borderRight: '1px solid rgba(34, 197, 94, 0.12)',
    },
    '.cm-activeLine': {
        backgroundColor: 'rgba(34, 197, 94, 0.08)',
    },
    '.cm-activeLineGutter': {
        backgroundColor: 'rgba(34, 197, 94, 0.12)',
        color: '#4ade80',
    },
}, { dark: true })

export const themeSunset = EditorView.theme({
    '&': {
        backgroundColor: '#1a0e14',
        color: 'rgba(255, 224, 204, 0.9)',
        border: '1px solid rgba(251, 113, 133, 0.35)',
        borderRadius: '12px',
        overflow: 'hidden',
    },
    '&.cm-focused': {
        outline: 'none',
        borderColor: 'rgba(251, 113, 133, 0.65)',
        boxShadow: '0 0 20px rgba(251, 146, 60, 0.18)',
    },
    '.cm-content': {
        caretColor: '#fb923c',
        fontFamily: "'Courier New', monospace",
        fontSize: '13.5px',
    },
    '.cm-cursor': {
        borderLeftColor: '#fb923c',
    },
    '.cm-selectionBackground, &.cm-focused .cm-selectionBackground': {
        backgroundColor: 'rgba(251, 113, 133, 0.28) !important',
    },
    '.cm-gutters': {
        backgroundColor: 'rgba(251, 113, 133, 0.04)',
        color: 'rgba(255, 224, 204, 0.3)',
        border: 'none',
        borderRight: '1px solid rgba(251, 113, 133, 0.12)',
    },
    '.cm-activeLine': {
        backgroundColor: 'rgba(251, 146, 60, 0.08)',
    },
    '.cm-activeLineGutter': {
        backgroundColor: 'rgba(251, 146, 60, 0.12)',
        color: '#fdba74',
    },
}, { dark: true })

export const editorThemes: Record<string, ReturnType<typeof EditorView.theme>> = {
    codequest: themeCodeQuest,
    dark: themeDark,
    light: themeLight,
    ocean: themeOcean,
    matrix: themeMatrix,
    sunset: themeSunset,
}
