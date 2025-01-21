import { Component } from '@angular/core';
import { ProfileResponse } from '../../../../services/profile/models/profile-response';
import { ProfileService } from '../../../../services/profile/profile.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-profile',
    imports: [CommonModule],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css',
})
export class ProfileComponent {
    profileData: ProfileResponse | null = null;
    isLoading: boolean = true;
    errorMessage: string | null = null;

    constructor(private profileService: ProfileService) {}

    ngOnInit(): void {
        this.loadProfile();
    }

    loadProfile(): void {
        this.profileService.getProfile().subscribe({
            next: (data) => {
                this.profileData = data;
                this.isLoading = false;
                console.log('Profile data:', data);
            },
            error: (error) => {
                console.error('Error loading profile:', error);
                this.errorMessage = 'Failed to load profile data.';
                this.isLoading = false;
            },
        });
    }
}
