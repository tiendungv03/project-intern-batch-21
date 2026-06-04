import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Relationship } from '../../../../models/interfaces/lead-detail.interface';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: 'app-lead-relationship-table',
  standalone: true,
  imports: [CommonModule, SvgIconComponent, FormsModule],
  templateUrl: './lead-relationship-table.component.html',
  styleUrl: './lead-relationship-table.component.scss',
})
export class LeadRelationshipTableComponent {
  @Input() relationships!: Relationship[];

  isAddingNew = false;
  editingId: string | null = null;
  newRelationship: Partial<Relationship> = {
    name: '',
    leadId: '',
    type: '',
    relationship: '',
    avatarUrl: '',
  };

  // Search and sort
  searchText: string = '';
  // null = no sort, true = asc, false = desc
  sortAsc: boolean | null = null;

  trackByRel(_index: number, item: Relationship) {
    return item.id;
  }

  showAddForm() {
    this.isAddingNew = true;
    this.newRelationship = {
      name: '',
      leadId: '',
      type: '',
      relationship: '',
      avatarUrl: '',
    };
  }

  saveNewRelationship() {
    if (
      this.newRelationship.name &&
      this.newRelationship.leadId &&
      this.newRelationship.type &&
      this.newRelationship.relationship
    ) {
      const newRel: Relationship = {
        id: `r${Date.now()}`,
        name: this.newRelationship.name,
        leadId: this.newRelationship.leadId,
        type: this.newRelationship.type,
        relationship: this.newRelationship.relationship,
        avatarUrl:
          this.newRelationship.avatarUrl || 'https://i.pravatar.cc/100',
      };
      this.relationships.push(newRel);
      this.cancelAdd();
    }
  }

  cancelAdd() {
    this.isAddingNew = false;
    this.newRelationship = {};
  }

  deleteRelationship(id: string) {
    this.relationships = this.relationships.filter((rel) => rel.id !== id);
  }

  startEdit(rel: Relationship) {
    this.editingId = rel.id;
  }

  saveEdit(rel: Relationship) {
    this.editingId = null;
  }

  cancelEdit() {
    this.editingId = null;
  }

  toggleSort() {
    if (this.sortAsc === null) {
      this.sortAsc = true;
    } else {
      this.sortAsc = !this.sortAsc;
    }
  }

  get displayedRelationships(): Relationship[] {
    const q = this.searchText?.trim().toLowerCase();
    let list = (this.relationships ?? []) as Relationship[];

    if (q) {
      list = list.filter((r) => {
        const name = (r.name || '').toLowerCase();
        const leadId = (r.leadId || '').toLowerCase();
        const type = (r.type || '').toLowerCase();
        const rel = (r.relationship || '').toLowerCase();
        return (
          name.includes(q) ||
          leadId.includes(q) ||
          type.includes(q) ||
          rel.includes(q)
        );
      });
    }

    if (this.sortAsc === null) return list;

    return list.slice().sort((a, b) => {
      const an = (a.name || '').toLowerCase();
      const bn = (b.name || '').toLowerCase();
      if (an < bn) return this.sortAsc ? -1 : 1;
      if (an > bn) return this.sortAsc ? 1 : -1;
      return 0;
    });
  }
}
