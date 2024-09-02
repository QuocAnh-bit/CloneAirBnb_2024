const Transformer = require("../core/Transformer");

class AuthTransformer extends Transformer {
  response(instance) {
    return {
      id: instance.id,
      username: instance.username,
      email: instance.email,
      refreshToken: instance.refresh_token,
      accessToken: instance.access_token,
      avatar: instance.avatar,
      createdAt: instance.created_at,
      updatedAt: instance.updated_at,
    };
  }
}
module.exports = AuthTransformer;
