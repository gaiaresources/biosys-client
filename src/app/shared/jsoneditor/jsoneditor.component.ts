import { Component, OnInit, ElementRef, Input, Output, EventEmitter } from '@angular/core';

import { JsonEditorOptions } from './jsoneditor.options';

const JSONEditor = require('jsoneditor');

@Component({
    selector: 'biosys-json-editor',
    template: `
        <div></div>`,
})
export class JsonEditorComponent implements OnInit {
    public editor: any;

    @Input()
    private options: JsonEditorOptions;

    @Input()
    private data: Object;

    @Output() dataChange = new EventEmitter<Object>();

    constructor(private rootElement: ElementRef) {
    }

    ngOnInit() {

        if (null === this.options) {
            throw new Error('"options" is required');
        }

        if (null === this.data) {
            this.data = {};
        }
        this.editor = new JSONEditor(this.rootElement.nativeElement, this.options, this.data);
    }

    public collapseAll() {
        this.editor.collapseAll();
    }

    public destroy() {
        this.editor.destroy();
    }

    public expandAll() {
        this.editor.expandAll();
    }

    public focus() {
        this.editor.focus();
    }

    public set(json: JSON) {
        this.editor.set(json);
    }

    public setMode(mode: string) {
        this.editor.setMode(mode);
    }

    public setName(name: string) {
        this.editor.setName(name);
    }

    public setSchema(schema: any) {
        this.editor.setSchema(schema);
    }

    public get(): JSON {
        return this.editor.get();
    }

    public getMode(): string {
        return this.editor.getMode();
    }

    public getName(): string {
        return this.editor.getName();
    }

    public getText(): string {
        return this.editor.getText();
    }
}
