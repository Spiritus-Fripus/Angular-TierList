import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-liste',
	standalone: true,
	imports: [FormsModule],
	templateUrl: './liste.component.html',
	styleUrl: './liste.component.scss',
})
export class ListeComponent {

	categories: {
		nom: string,
		elements: string[]
	}[] = [];

	urlSaisie: string = '';

	ngOnInit() {
		const gategoriesEnregistre = localStorage.getItem('categories');

		if (gategoriesEnregistre == null) {
			this.categories = [
				{ nom: 'S', elements: [] },
				{ nom: 'A', elements: [] },
				{ nom: 'B', elements: [] },
				{ nom: 'C', elements: [] },
				{ nom: 'D', elements: [] }
			];
		} else {
			this.categories = JSON.parse(gategoriesEnregistre);
		}
	}

	onAjoutElement() {
		if (this.urlSaisie != '') {
			this.categories[0].elements.push(this.urlSaisie);
		}
		this.urlSaisie = '';

		// on enregistre dans le localstorage 
		localStorage.setItem('categories', JSON.stringify(this.categories));
	}

	onSupprimeElement(
		categorieElementSupprime: { nom: string, elements: string[] },
		indexElementSupprime: number) {
		// on supprime l'element de la categorie
		categorieElementSupprime.elements.splice(indexElementSupprime, 1);
		// on enregistre dans le localstorage 
		localStorage.setItem('categories', JSON.stringify(this.categories));
	}

	onChangeCategories(
		indexCategorie: number,
		indexElement: number,
		monte: boolean) {
		// on recupere l'element avant de le supprimer
		const element = this.categories[indexCategorie].elements[indexElement];
		// on supprime l'element de sa catégorie actuelle
		this.categories[indexCategorie].elements.splice(indexElement, 1);
		// on l'ajoute à sa nouvelle catégorie
		this.categories[indexCategorie + (monte ? -1 : 1)].elements.push(element);
		// on enregiste le local storage
		localStorage.setItem('categories', JSON.stringify(this.categories));
	}
}
