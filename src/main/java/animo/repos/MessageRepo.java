package animo.repos;

import org.springframework.data.repository.CrudRepository;
import animo.domain.Message;
import animo.domain.User;

import java.util.List;

public interface MessageRepo  extends CrudRepository<Message, Long> {
    List<Message> findByTag(String tag);
    List<Message> findByAuthor(User user);
}
