const { User, Post, Comment, Profile } = require("../models");
const { signToken, AuthenticationError } = require('../utils/auth')

const resolvers = {
  Query: {
    userPrefs: async ( parent, args, context) => {

      if (!context.user) {
        throw new Error('Authentication required');
      }

      const userPrefs = await User.findById(context.user._id).select('flairScores')

      return userPrefs.flairScores
    },
    getWeightedPosts: async ( parent, args, context ) => {

      if (!context.user) {
        throw new Error('Authentication required');
      }



    },
    profile: async (parent, { userId }) => {
      return Profile.findOne({ userId: userId });
    },
    // links: async () => {
    //   return Link.find();
    // },
    // link: async (parent, { linkId }) => {
    //   return Link.findOne({ _id: linkId });
    // },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    addUser: async (parent, { firstName, lastName, email, password }) => {
      
      const user = await User.create({ firstName, lastName, email, password });
      
      const token = signToken(user);

      return { token, user };
    },
    addProfile: async (parent, { username, bio }, context) => {

      if (!context.user) {
        throw new Error('Authentication required');
      }

      const profile = await Profile.create({
        username,
        bio,
        userId: context.user._id
      });
      
      return profile;
    },
    // Used to update a user's flairScores array after Profile creation
    updateUserPrefs: async (parent, args, context) => {

      const { input } = args

      if (!context.user) {
        throw new Error('Authentication required');
      }

      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $set: { flairScores: input } },
        { new: true }
      )

      // if (!user) {
      //   throw new Error('User not found');
      // }

      // input.forEach(flairScore => {
      //   const index = user.flairScores.findIndex(fs => fs.tag === flairScore.tag);
        
      //   if (index !== -1) {
      //     user.flairScores[index].score = flairScore.score;
      //   }
      // });

      return updatedUser
    },
  },
};

module.exports = resolvers;
