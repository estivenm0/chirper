/**
 * This file is auto generated using 'php artisan typescript:generate'
 *
 * Changes to this file will be lost when the command is run again
 */

declare namespace App.Models {
    export interface Chirp {
        id: number;
        user_id: number;
        message: string;
        created_at: string | null;
        updated_at: string | null;
        user?: App.Models.User | null;
    }

    export interface User {
        id: number;
        name: string;
        email: string;
        email_verified_at: string | null;
        password: string;
        remember_token: string | null;
        created_at: string | null;
        updated_at: string | null;
        chirps?: Array<App.Models.Chirp> | null;
        chirps_count?: number | null;
    }

}
