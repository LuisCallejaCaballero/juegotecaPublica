import { finalScore } from './game.js'; // Ajusta la ruta si es necesario
import { supabase } from '../../../supabaseClient.js'; // Asegúrate de tener este archivo configurado

export async function saveScoreToSupabase(user) {
    if (!user || finalScore == null) return;

    try {
        // Buscar si el usuario ya existe
        const { data, error: fetchError } = await supabase
            .from('tetris')
            .select('user, points')
            .eq('user', user);

        if (fetchError) {
            displayMessage('❌ Error al obtener puntuación existente: ' + fetchError.message);
            return;
        }

        if (data.length > 0) {
            // Si el usuario existe, compara la puntuación
            const existingScore = data[0].points;

            if (existingScore < finalScore) {
                // Si la nueva puntuación es mayor, actualiza
                const { error: updateError } = await supabase
                    .from('tetris')
                    .update({ points: finalScore })
                    .eq('user', user);

                if (updateError) {
                    displayMessage('❌ Error al actualizar la puntuación: ' + updateError.message);
                } else {
                    displayMessage('✅ Puntuación actualizada');
                }
            } else {
                displayMessage('ℹ️ La puntuación no es mayor, no se actualiza');
            }
        } else {
            // Si el usuario no existe, inserta la nueva puntuación
            const { error: insertError } = await supabase
                .from('tetris')
                .insert([{ user, points: finalScore }]);

            if (insertError) {
                displayMessage('❌ Error al guardar puntuación: ' + insertError.message);
            } else {
                displayMessage('✅ Puntuación guardada');
            }
        }
    } catch (error) {
        displayMessage('❌ Error inesperado: ' + error.message);
    }
}

// Función para mostrar los mensajes en la UI
function displayMessage(message) {
    const messageContainer = document.getElementById('messageContainer');
    const messageText = document.getElementById('messageText');

    messageText.textContent = message;
    messageContainer.style.display = 'block';

    // Después de 5 segundos, ocultar el mensaje
    setTimeout(() => {
        messageContainer.style.display = 'none';
    }, 5000);
}
