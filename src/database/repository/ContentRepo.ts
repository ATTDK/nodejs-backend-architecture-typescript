import Content, { ContentModel } from '../model/Content';
import Site, { SiteModel} from '../model/Site'
import { InternalError } from '../../core/ApiError';
import { Number, Types } from 'mongoose';

export default class ContentRepo {
  // 다시 만들어야함
  public static findByTitleAndContentNumber(title: string, contentNumber : Number): Promise<Content | null> {
    return ContentModel.findOne({ _title: title, _contentNumber : contentNumber, status: true })
      .select('+email +password +roles')
      .populate({
        path: 'roles',
        match: { status: true },
      })
      .lean<Content>()
      .exec();
  }

  public static async create(content: Content): Promise< Content > {
    const now = new Date();
    content.createdAt = now;
    const createdContent = await ContentModel.create(content);
    return createdContent;
  }

  public static async update(
    content: Content,
  ): Promise<{ content: Content }> {
    await ContentModel.updateOne({ _id: content._id }, { $set: { ...content } })
      .lean()
      .exec();
    return { content: content};
  }
}
