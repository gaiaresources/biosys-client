import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ConfirmationService, Message, MessageService, SelectItem } from 'primeng/api';
import { map } from 'rxjs/operators';

import { APIError, User, Program } from '../../../../biosys-core/interfaces/api.interfaces';
import { APIService } from '../../../../biosys-core/services/api.service';
import { DEFAULT_GROWL_LIFE } from '../../../shared/utils/consts';
import { formatUserFullName } from '../../../../biosys-core/utils/functions';

@Component({
    moduleId: module.id,
    selector: 'biosys-edit-program',
    templateUrl: 'edit-program.component.html',
})

export class EditProgramComponent implements OnInit {
    private static readonly PROGRAMS_URL = '/administration/programs';

    public DEFAULT_GROWL_LIFE: number = DEFAULT_GROWL_LIFE;
    public breadcrumbItems: any = [];
    public program: Program = {};
    public dataEngineerChoices: SelectItem[];

    public programErrors: any = {};
    public messages: Message[] = [];

    constructor(private apiService: APIService, private router: Router, private route: ActivatedRoute,
                private messageService: MessageService, private confirmationService: ConfirmationService) {
    }

    ngOnInit() {
        this.breadcrumbItems = [
            {label: 'Administration - Programs', routerLink: [EditProgramComponent.PROGRAMS_URL]},
        ];

        const params = this.route.snapshot.params;

        if (params.hasOwnProperty('id')) {
            this.apiService.getProgramById(+params['id']).subscribe(
                (program: Program) => {
                    this.program = program;
                    this.breadcrumbItems.push({label: this.program.name});
                },
                (error: APIError) => console.log('error.msg', error.msg)
            );
        } else {
            this.breadcrumbItems.push({label: 'Create Program'});
        }

        this.apiService.getUsers()
            .pipe(
                map((users: User[]): SelectItem[] =>
                    users.map((user: User): SelectItem => {
                        return {
                            label: formatUserFullName(user),
                            value: user.id
                        };
                    })
                )
            )
            .subscribe(
                (users: SelectItem[]) => this.dataEngineerChoices = users,
                (error: APIError) => console.log('error.msg', error.msg)
            );

        // for some reason the growls won't disappear if messages populated during init, so need
        // to set a timeout to remove
        setTimeout(() => {
            this.messages = [];
        }, DEFAULT_GROWL_LIFE);
    }

    public save() {
        if (this.program.id) {
            this.apiService.updateProgram(this.program).subscribe(
                () => {
                    this.router.navigate([EditProgramComponent.PROGRAMS_URL]);
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Program saved',
                        detail: `The program ${this.program.name} was saved`,
                        key: 'mainToast'
                    });
                },
                (errors: APIError) => this.programErrors = errors.msg
            );
        } else {
            this.apiService.createProgram(this.program).subscribe(
                () => {
                    this.router.navigate([EditProgramComponent.PROGRAMS_URL]);
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Program created',
                        detail: `The program ${this.program.name} was created`,
                        key: 'mainToast'
                    });
                },
                (errors: APIError) => this.programErrors = errors.msg
            );
        }
    }

    public cancel() {
        this.router.navigate([EditProgramComponent.PROGRAMS_URL]);
    }

    public confirmDelete(event: any) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this program? Warning: all related projects and records' +
            'will also be deleted.',
            accept: () => this.apiService.deleteProgram(this.program.id).subscribe(
                (program: Program) => this.onDeleteSuccess(this.program),
                (error: APIError) => this.onDeleteError(error))
        });
    }

    private onDeleteSuccess(program: Program) {
        this.router.navigate([EditProgramComponent.PROGRAMS_URL, {'programDeleted': true}]);
    }

    private onDeleteError(errors: any) {
        this.messageService.add({
            severity: 'error',
            summary: 'Program delete error',
            detail: 'There were error(s) deleting the program: ' + errors.msg,
            key: 'mainToast'
        });
    }

}
