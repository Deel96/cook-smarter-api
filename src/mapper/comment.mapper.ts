import { CommentDTO } from "../models/DTOs/comment.dto";
import { Comment } from "../models/entities/comment";

export class CommentMapper{

    toDTO(item: Comment): CommentDTO {
        return {
                id:item.id,
                date: item.date,
                text : item.text,
                authorId:item.author.id
                
            }
}

}